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
} from "@mui/material";

interface EventCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    name: string;
    unitNumber: string;
    facility: string;
    time: string;
    date: string;
  }) => void;
  defaultDate: string;
}

const ReservationModal: React.FC<EventCreationDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultDate,
}) => {
  const [name, setName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [facility, setFacility] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    setName(`${userData.username}`);
  }, []);

  const handleSubmit = () => {
    onSubmit({ name, unitNumber, facility, time, date: defaultDate });
    setUnitNumber("");
    setFacility("");
    setTime("");
    onClose();
  };

  const customTextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "var(--color4)", // Default text color
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
              color: "#3c3633", // Custom color for InputLabel
              "&.Mui-focused": {
                color: "#747264", // Change the color of the label to brown when focused
              },
            }}
          >
            Facility
          </InputLabel>
          <Select
            labelId="facility-label"
            id="facility"
            value={facility}
            label="Facility"
            onChange={(e) => setFacility(e.target.value)}
            sx={{
              "& .MuiSelect-select": {
                color: "#3c3633", // Change the color of the select button to brown
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#747264", // Ensure the border color remains brown when focused
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#747264", // Change the hover color of the menu items to brown
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#e0ccbe", // Change the background color of the selected menu items to brown
                  },
                },
              },
            }}
          >
            <MenuItem value="Spa Fitness">Spa Fitness</MenuItem>
            <MenuItem value="Sauna">Sauna</MenuItem>
            <MenuItem value="Sky Lounge">Sky Lounge</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense" sx={customTextFieldStyle}>
          <InputLabel
            id="time-label"
            sx={{
              color: "#3c3633", // Custom color for InputLabel
              "&.Mui-focused": {
                color: "#747264", // Change the color of the label to brown when focused
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
                color: "#3c3633", // Change the color of the select button to brown
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#747264", // Ensure the border color remains brown when focused
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "#747264", // Change the hover color of the menu items to brown
                  },
                  "& .MuiMenuItem-root.Mui-selected": {
                    backgroundColor: "#e0ccbe", // Change the background color of the selected menu items to brown
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
              return (
                <MenuItem key={timeString} value={timeString}>
                  {timeString}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
