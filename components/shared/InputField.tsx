import { FC } from "react";
import { InputFieldProps } from "../../interfaces";

const InputField: FC<InputFieldProps> = (props) => {
  const { label = "", onTextChange, placeholder, type, value } = props;
  return (
    <div className="input-wrapper">
      {label.length ? <p className="input-label mb-3">{label}</p> : <></>}
      <small style={{fontStyle:"italic", color:"#040d21"}}>{value}</small>
      <input
        className="input" 
        type={type}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
