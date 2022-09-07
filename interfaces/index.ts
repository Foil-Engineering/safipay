export type User = {
  id: number
  name: string
}

export interface SharedButtonProps {
  label: string;
  type: 'filled' | 'outlined';
  primary?: boolean;
  link?: string;
  width?: number;
}

export interface InputFieldProps {
  label?: string;
  onTextChange: (e: InputEvent) => void;
  placeholder: string;
}
