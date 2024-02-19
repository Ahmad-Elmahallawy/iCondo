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

export default CondoInfoField;
