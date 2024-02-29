import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../../Style/UserProfileStyle/UserInformationStyle.css";
import { Box } from "@mui/material";
import api from "../../api";

// UserKeyRegister Component:
// This component renders a form for user to submit registration key.
const UserKeyRegister: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [errorText, setErrorText] = React.useState<string>("");
  const submitHandler = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      // Call api to register key
      await api.registerationKeys.userRegisterKey(key);
    } catch (error) {
      setErrorText("Error registering key");
    }
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
      <TextField
        sx={{ padding: "10px" }}
        fullWidth
        id="registrationKey"
        error={!!errorText}
        helperText={errorText}
        onInput={(e) => setKey((e.target as HTMLInputElement).value)}
      />
      <button className="user-information-button" type="submit">
        Submit
      </button>
    </Box>
  );
};

export default UserKeyRegister;
