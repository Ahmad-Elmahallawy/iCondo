import React, { ChangeEvent, useState } from 'react';
import '../../Style/CommonStyle/TextFieldStyle.css'; // Import the associated CSS file


const TextField: React.FC<{
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}> = ({ label, onChange, value }) => {
  const [isFocused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setFocused(false);
    }
  };

  return (
    <div className={`text-field ${isFocused || value ? 'focused' : ''}`}>
      <label htmlFor="textInput">{label}</label>
      <input
        type="text"
        id="textInput"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
