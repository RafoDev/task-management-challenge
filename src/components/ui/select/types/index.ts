import { ForwardRefExoticComponent, RefAttributes } from "react";

export type SingleSelectValue = string | number | undefined;
export type MultipleSelectValue = Array<string | number> | undefined;
export type SelectValue = SingleSelectValue | MultipleSelectValue;

export type SelectContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  value: SelectValue;
  onChange: (value: SelectValue) => void;
  onBlur: () => void;
  multiple?: boolean;
};

export type SelectProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  "value" | "onChange"
> & {
  value: SelectValue;
  onChange: (value: SelectValue) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  className?: string;
  multiple?: boolean;
  children: React.ReactNode;
};

export type OptionProps = {
  value: string | number;
  children: React.ReactNode;
};

export type SelectComponent = ForwardRefExoticComponent<
  SelectProps & RefAttributes<HTMLDivElement>
> & {
  Option: React.FC<OptionProps>;
  CheckboxOption: React.FC<OptionProps>;
};
