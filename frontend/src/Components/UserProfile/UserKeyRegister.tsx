import React from "react";
import TextField from "@mui/material/TextField";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { Box } from "@mui/material";

// UserKeyRegister Component:
// This component renders a form for user to submit registration key.
const UserKeyRegister: React.FC = () => {
  const submitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        textAlign: "center",
      }}
      component="form"
      onSubmit={submitHandler}
    >
      <h2>Submit Registration Key</h2>
      <TextField sx={{ padding: "10px" }} fullWidth id="registrationKey" />
      <button className="user-information-button" type="submit">
        Submit
      </button>
    </Box>
  );
};

export default UserKeyRegister;
