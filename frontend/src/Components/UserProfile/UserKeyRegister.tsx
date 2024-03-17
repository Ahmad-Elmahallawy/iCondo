import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import api from "../../api";

const UserKeyRegister: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call userRegisterKey API endpoint to register the key
      const registerResponse = await api.registerationKeys.userRegisterKey(key);

      // Check if registration was successful
      if (registerResponse.data.length === 0) {
        setErrorText(
          "Error registering key: Key not found or already registered"
        );
        setSuccessMessage("");
        return; // Exit early if registration fails
      }

      // Get condoId from the registration response
      const condoId = registerResponse.data[0]?.condoUnit?.id;
      if (!condoId) {
        throw new Error("Condo ID not found in registration response");
      }

      // Call getRegistrationKey API endpoint to retrieve condoId
      const getResponse = await api.registerationKeys.getRegistrationKey(key);

      // Check if condoId is present in the response data
      const responseCondoId = getResponse.data[0]?.condoUnit?.id;
      if (!responseCondoId) {
        throw new Error("Condo ID not found in response");
      }

      // Register the user to the condo
      const linkCondoUser = await api.userCondoList.postUserCondo(
        condoId,
        userData.id,
        userData.accessToken
      );

      setSuccessMessage("Key registered successfully!");
      setErrorText("");
    } catch (error: any) {
      // Handle errors from either API call
      console.error("Error registering key:", error);
      setErrorText("Error registering key: " + error.message);
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
