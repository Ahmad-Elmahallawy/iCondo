// CondoInfoField.tsx
import "../../Style/CondoProfileStyle/CondoInfoFieldStyle.css";

interface CondoInfoFieldProps {
  label: string;
  value: string;
  isEditMode: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const CondoInfoField: React.FC<CondoInfoFieldProps> = ({
  label,
  value,
  isEditMode,
  onChange,
  name,
}) => {
  return (
    // Container div for the input field or text display.
    <div className="input-container">
      // Displays the label for the field.
      <span className="input-label">{label}:</span>
      {isEditMode ? (
        // Renders an input field if the component is in edit mode.
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="editModeInput"
        />
      ) : (
        // Displays the value as text if not in edit mode.
        <span className="input-value">{value}</span>
      )}
    </div>
  );
};

export default CondoInfoField; // Exports the CondoInfoField component for use in other parts of the application.
