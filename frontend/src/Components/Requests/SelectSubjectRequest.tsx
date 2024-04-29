// SelectSubjectRequest.tsx

import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { makeStyles } from "@mui/material";

interface SelectSubjectRequestProps {
  onSelect: (subject: string) => void; // Define onSelect prop
}

export default function SelectSubjectRequest({
  onSelect,
}: SelectSubjectRequestProps) {
  const [request, setRequest] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;

    setRequest(selectedValue);
    onSelect(selectedValue); // Call the onSelect prop with the selected value
  };

  return (
    <FormControl sx={{ minWidth: 500 }} size="small">
      <InputLabel
        id="demo-select-small-label"
        sx={{
          color: "#3c3633", // Custom color for InputLabel
          "&.Mui-focused": {
            color: "#747264", // Change the color of the label to brown when focused
          },
        }}
      >
        Request
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={request}
        label="Request"
        onChange={handleChange}
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
        <MenuItem value="moving_in">Moving In</MenuItem>
        <MenuItem value="moving_out">Moving Out</MenuItem>
        <MenuItem value="intercom_change">Intercom Changes</MenuItem>
        <MenuItem value="access_request">Request Access</MenuItem>
        <MenuItem value="violation_report">Report a Violation</MenuItem>
        <MenuItem value="deficiency_report">Report a Deficiency</MenuItem>
        <MenuItem value="question">Question</MenuItem>
      </Select>
    </FormControl>
  );
}
