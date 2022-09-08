import Link from "next/link";
import { FC } from "react";
import { SharedButtonProps } from "../../interfaces";

const Button: FC<SharedButtonProps> = (props) => {
  const { link = "#", label, primary = true, type, width = 0 } = props;
  return (
    <a
      href={link}
      className={`${type}-btn ${primary ? "primary" : ""} ${
        !width ? "full" : `w${width}`
      } btn`}
    >
      <p className="btn-label">{label}</p>
    </a>
  );
};

export default Button;
