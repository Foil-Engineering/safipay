export type User = {
  id: number;
  name: string;
};

export interface SharedButtonProps {
  label: string;
  type: "filled" | "outlined" | "filled-secondary" | "outlined-secondary";
  primary?: boolean;
  link?: string;
  width?: number;
  icon?: string;
  hasShaddow?: boolean;
}

export interface InputFieldProps {
  label?: string;
  onTextChange: (text: string) => void;
  placeholder: string;
}
