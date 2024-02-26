// CondoInfoField.tsx
import "../../Style/CondoProfileStyle/CondoInfoFieldStyle.css"; // Styles import for the component

// Interface definition for props expected by CondoInfoField
interface CondoInfoFieldProps {
  label: string;
  value: string;
  isEditMode: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

// Functional component definition using destructuring to directly access props
const CondoInfoField: React.FC<CondoInfoFieldProps> = ({
  label,
  value,
  isEditMode,
  onChange,
  name,
}) => {
  return (
    // Container for the entire field, including label and value/input
    <div className="input-container">
      <span className="input-label">{label}:</span>
      {isEditMode ? (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="editModeInput"
        />
      ) : (
        <span className="input-value">{value}</span>
      )}
    </div>
  );
};

// Exporting the component for use in other parts of the application
export default CondoInfoField;
