import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import { makeStyles } from "@mui/material";

export default function SelectSubjectRequest() {
  const [request, setRequest] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRequest(event.target.value);
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
        <MenuItem value="moving">Moving In/Out</MenuItem>
        <MenuItem value="intercom">Intercom Changes</MenuItem>
        <MenuItem value="access">Request Access</MenuItem>
        <MenuItem value="violation">Report a Violation</MenuItem>
        <MenuItem value="question">Question</MenuItem>
      </Select>
    </FormControl>
  );
}
