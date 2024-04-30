import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  DialogTitle,
  SelectChangeEvent, // Import this type for event handling
} from "@mui/material";
import axios from "axios";

// Updated the type definitions as necessary
interface EventCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    name: string;
    unitNumber: string;
    facilityName: string; // Keep the readable string
    facilityId: string; // Additional info to pass
    time: string;
    date: string;
  }) => void;
  defaultDate: string;
}

interface Facility {
  status: string;
  id: string;
  facilityType: string;
}

const ReservationModal: React.FC<EventCreationDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultDate,
}) => {
  const customTextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "var(--color4)",
      "& fieldset": {
        borderColor: "var(--color3)",
      },

      "&.Mui-focused": {
        backgroundColor: "transparent", // Background color when focused
        color: "var(--color3)", // Text color when focused
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--color3)",
          boxShadow: "none", // This removes the elevation effect
        },
        "& .MuiInputLabel-root": {
          color: "#747264", // Label color when focused
        },
        "& .MuiInputLabel-shrink": {
          backgroundColor: "transparent", // Ensuring the background of the shrunken label is transparent
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: "#3c3633", // Custom color for TextField Label
      "&.Mui-focused": {
        color: "#747264", // Color of the TextField label when focused
      },
    },
    "&:hover .MuiInputLabel-root": {
      color: "var(--color3)",
    },
    "& fieldset": { backgroundColor: "transparent" },
  };

  const customButtonStyle = {
    backgroundColor: "var(--color3)",
    color: "var(--color1)",
    "&:hover": {
      backgroundColor: "var(--color4)",
    },
  };
  const [name, setName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [facility, setFacility] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [time, setTime] = useState("");
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [takenTimeSlots, setTakenTimeSlots] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  useEffect(() => {
    setName(`${user.username}`);
  }, []);

  useEffect(() => {
    const fetchFacilities = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/properties/${user.propertyID}/commonFacilities`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      const formattedFacilities = response.data.map((facility: Facility) => ({
        ...facility,
        facilityType: formatFacilityName(facility.facilityType),
      }));
      setFacilities(formattedFacilities);

      // Fetch availability for each common facility
      const availabilityPromises = response.data.map(
        async (reservation: any) => {
          const reserveAvailabilityResponse = await axios.get(
            `${process.env.REACT_APP_API_URL}/commonFacilities/${reservation.id}/availabilities`,
            {
              headers: { Authorization: `Bearer ${user.accessToken}` },
            }
          );

          return reserveAvailabilityResponse.data;
        }
      );

      const availabilities = await Promise.all(availabilityPromises);
      const flattenedAvailabilities = availabilities.flat(); // Flatten the array of arrays
      setTakenTimeSlots(flattenedAvailabilities);
    };

    fetchFacilities();
  }, []);

  const formatFacilityName = (name: string) => {
    return name.replace(/_/g, " ").replace(/\b(\w)/g, (s) => s.toUpperCase());
  };

  const handleFacilityChange = (event: SelectChangeEvent<string>) => {
    const id = event.target.value;
    const selectedFacility = facilities.find((f) => f.id === id);
    if (selectedFacility) {
      setFacility(selectedFacility.facilityType);
      setFacilityId(selectedFacility.id);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      name,
      unitNumber,
      facilityName: facility,
      facilityId,
      time,
      date: defaultDate,
    });

    // Update takenTimeSlots state to remove the booked time slot
    const updatedTakenTimeSlots = takenTimeSlots.filter(
      (slot) =>
        !(
          slot.availablity.includes(time) &&
          slot.commonFacility.id === facilityId &&
          slot.availablity.includes(defaultDate)
        )
    );
    setTakenTimeSlots(updatedTakenTimeSlots);

    setUnitNumber("");
    setFacility("");
    setFacilityId("");
    setTime("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "var(--color4)" }}>
        Common Facility Reservation
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" sx={{ color: "var(--color4)" }}>
          User: {name}
        </Typography>
        <TextField
          margin="dense"
          id="unitNumber"
          label="Unit Number"
          fullWidth
          value={unitNumber}
          sx={customTextFieldStyle}
          onChange={(e) => setUnitNumber(e.target.value)}
        />
        <FormControl fullWidth margin="dense" sx={customTextFieldStyle}>
          <InputLabel
            id="facility-label"
            sx={{
              color: "#3c3633",
              "&.Mui-focused": {
                color: "#747264",
              },
            }}
          >
            Facility
          </InputLabel>
          <Select
            labelId="facility-label"
            id="facility"
            value={facilityId}
            label="Facility"
            onChange={handleFacilityChange}
            sx={{
              "& .MuiSelect-select": {
                color: "#3c3633",
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#747264",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#747264",
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#e0ccbe",
                  },
                },
              },
            }}
          >
            {facilities.map((facility) =>
              // Check if the facility status is not "close" before rendering the MenuItem
              facility.status !== "close" ? (
                <MenuItem key={facility.id} value={facility.id}>
                  {facility.facilityType}
                </MenuItem>
              ) : null
            )}
          </Select>
        </FormControl>
        {facilityId && (
          <FormControl fullWidth margin="dense" sx={customTextFieldStyle}>
            <InputLabel
              id="time-label"
              sx={{
                color: "#3c3633",
                "&.Mui-focused": {
                  color: "#747264",
                },
              }}
            >
              Time
            </InputLabel>
            <Select
              labelId="time-label"
              id="time"
              value={time}
              label="Time"
              onChange={(e) => setTime(e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  color: "#3c3633",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#747264",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "#747264",
                    },
                    "& .MuiMenuItem-root.Mui-selected": {
                      backgroundColor: "#e0ccbe",
                    },
                  },
                },
              }}
            >
              {Array.from({ length: 13 }, (_, i) => {
                const startHour = 8 + i; // Start from 8 AM
                const endHour = startHour + 1; // End hour for each slot
                const startAmPm = startHour >= 12 ? "PM" : "AM";
                const endAmPm = endHour >= 12 ? "PM" : "AM";
                const formattedStartHour =
                  startHour > 12 ? startHour - 12 : startHour;
                const formattedEndHour = endHour > 12 ? endHour - 12 : endHour;
                const timeString = `${formattedStartHour}:00 ${startAmPm} - ${formattedEndHour}:00 ${endAmPm}`;
                const isTaken = takenTimeSlots.some(
                  (slot) =>
                    slot.availablity.includes(timeString) &&
                    slot.commonFacility.id === facilityId &&
                    slot.availablity.includes(defaultDate)
                );
                // Only render the time slot in the dropdown if it's not taken
                if (!isTaken) {
                  return (
                    <MenuItem key={timeString} value={timeString}>
                      {timeString}
                    </MenuItem>
                  );
                }
                return null; // Skip rendering if the time slot is taken
              })}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={customButtonStyle}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={customButtonStyle}>
          Reserve Facility
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationModal;
