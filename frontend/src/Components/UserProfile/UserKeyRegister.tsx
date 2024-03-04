import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import api from "../../api";

const UserKeyRegister: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.registerationKeys.userRegisterKey(key);
      if (response.data.length === 0) {
        setErrorText("Error registering key");
        setSuccessMessage("");
      } else {
        setSuccessMessage("Key registered successfully!");
        setErrorText("");
      }
      console.log(response);
    } catch (error) {
      setErrorText("Error registering key");
      setSuccessMessage("");
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
        fullWidth
        id="registrationKey"
        error={!!errorText}
        helperText={errorText}
        label="Registration Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        data-testid="registrationKey"
      />
      <button className="user-information-button" type="submit">
        Submit
      </button>
      {successMessage && (
        <Typography color="green">{successMessage}</Typography>
      )}
    </Box>
  );
};

export default UserKeyRegister;
