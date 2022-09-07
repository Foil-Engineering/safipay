import Link from "next/link";
import { FC } from "react";
import { SharedButtonProps } from "../../interfaces";

const Button: FC<SharedButtonProps> = (props) => {
  const { link = "#", label, primary = true, type, width = 0 } = props;
  return (
    <Link
      href={link}
      className={`${type}-btn ${primary ? "primary" : ""} ${
        !width ? "full-btn" : ""
      } btn`}
    >
      <p>{label}</p>
    </Link>
  );
};

export default Button;
