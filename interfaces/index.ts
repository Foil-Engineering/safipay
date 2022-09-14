export type User = {
  id: number;
  name: string;
};

export interface SharedButtonProps {
  label: string;
  type:
    | "filled"
    | "outlined"
    | "filled-secondary"
    | "outlined-secondary"
    | "filled-danger"
    | "outlined-danger";
  primary?: boolean;
  link?: string;
  width?: number;
  icon?: string;
  hasShaddow?: boolean;
  onClick?: () => void;
}

export interface InputFieldProps {
  label?: string;
  onTextChange: (text: string) => void;
  placeholder: string;
  type: string;
  value?: string;
}
