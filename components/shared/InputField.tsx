import { FC } from "react";
import { InputFieldProps } from "../../interfaces";

const InputField: FC<InputFieldProps> = (props) => {
  const { label = "", onTextChange, placeholder } = props;
  return (
    <div className="input-wrapper">
      {label.length ? <p className="input-label">{label}</p> : <></>}
      <input
        className="input"
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
