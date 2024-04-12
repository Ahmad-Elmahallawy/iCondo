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
  id: string;
  facilityType: string;
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
  const [facilityId, setFacilityId] = useState("");
  const [time, setTime] = useState("");
  const [facilities, setFacilities] = useState<Facility[]>([]);
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
    setUnitNumber("");
    setFacility("");
    setFacilityId("");
    setTime("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Common Facility Reservation</DialogTitle>
      <DialogContent>
        <Typography>User: {name}</Typography>
        <TextField
          margin="dense"
          id="unitNumber"
          label="Unit Number"
          fullWidth
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="facility-label">Facility</InputLabel>
          <Select
            labelId="facility-label"
            id="facility"
            value={facilityId}
            label="Facility"
            onChange={handleFacilityChange}
          >
            {facilities.map((facility) => (
              <MenuItem key={facility.id} value={facility.id}>
                {facility.facilityType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="time-label">Time</InputLabel>
          <Select
            labelId="time-label"
            id="time"
            value={time}
            label="Time"
            onChange={(e) => setTime(e.target.value)}
          ></Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Reserve Facility</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationModal;
