import Image from "next/image";
import { FC } from "react";
import { SharedButtonProps } from "../../interfaces";

const Button: FC<SharedButtonProps> = (props) => {
  const {
    link,
    label,
    primary = true,
    type,
    width = 0,
    icon,
    hasShaddow = false,
    loading,
    onClick,
  } = props;
  return (
    <>
      {link ? (
        <a
          href={link ? link : ""}
          className={`${type}-btn ${primary ? "primary" : ""} ${
            !width ? "full" : `w${width}`
          } btn flex flex-row items-center justify-center ${
            hasShaddow ? "btn-shaddow" : ""
          }`}
          onClick={onClick}
        >
          {icon ? (
            <Image src={icon} alt="btn icon" height="26px" width="26px" />
          ) : (
            <></>
          )}
          {loading ? (
            <Image
              src="/assets/shared/loading.gif"
              alt="loading"
              height="26px"
              width="26px"
            />
          ) : (
            <p className="btn-label">{label}</p>
          )}
        </a>
      ) : (
        <button
          className={`${type}-btn ${primary ? "primary" : ""} ${
            !width ? "full" : `w${width}`
          } btn flex flex-row items-center justify-center ${
            hasShaddow ? "btn-shaddow" : ""
          }`}
          onClick={onClick}
        >
          {icon ? (
            <Image src={icon} alt="btn icon" height="26px" width="26px" />
          ) : (
            <></>
          )}
          {loading ? (
            <Image
              src="/assets/shared/loading.gif"
              alt="loading"
              height="26px"
              width="26px"
            />
          ) : (
            <p className="btn-label">{label}</p>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
