// SelectResponseRequest.tsx
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface SelectResponseRequestProps {
  subject: string; // The selected subject type
  onSelect: (response: string) => void; // Callback function for selecting response
}

const SelectResponseRequest: React.FC<SelectResponseRequestProps> = ({
  subject,
  onSelect,
}) => {
  // Define responses for each subject type
  const responses: { [key: string]: string[] } = {
    moving_in: [
      "Your moving in request has been successfully processed.",
      "We've noted your moving in request. It will be addressed shortly.",
      "Thank you for your moving in request. We'll get back to you soon.",
    ],
    moving_out: [
      "Your moving out request has been received and is under review.",
      "We've received your moving out request. Our team will handle it promptly.",
      "Thank you for submitting your moving out request. We'll follow up shortly.",
    ],
    intercom_change: [
      "The changes to the intercom have been updated as per your request.",
      "We've processed the intercom changes. You should see the updates soon.",
      "Thank you for notifying us about the intercom changes. We'll take care of it.",
    ],
    access_request: [
      "Your access request has been successfully submitted.",
      "We've recorded your access request. Expect an update soon.",
      "Thank you for your access request. We'll handle it promptly.",
    ],
    violation_report: [
      "Your violation report has been received. We'll investigate and take necessary action.",
      "Thank you for reporting the violation. Our team will look into it.",
      "We've noted your violation report. We'll follow up with any updates.",
    ],
    deficiency_report: [
      "Your deficiency report has been noted. Our team will address it shortly.",
      "Thank you for reporting the deficiency. We'll work on resolving it.",
      "We've received your deficiency report. Expect updates soon.",
    ],
    question: [
      "Thank you for your question. We'll provide a response as soon as possible.",
      "We've received your question and will respond shortly.",
      "Your question has been noted. Expect a response soon.",
    ],
  };

  // State to hold the selected response
  const [selectedResponse, setSelectedResponse] = React.useState("");

  // Function to handle response selection
  const handleResponseChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedResponse(selectedValue);
    onSelect(selectedValue); // Call the onSelect prop with the selected response
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-response-label">Select Response</InputLabel>
      <Select
        labelId="select-response-label"
        id="select-response"
        value={selectedResponse}
        label="Select Response"
        onChange={handleResponseChange}
      >
        {responses[subject].map((response, index) => (
          <MenuItem key={index} value={response}>
            {response}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectResponseRequest;
