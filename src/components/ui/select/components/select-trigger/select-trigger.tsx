import { memo } from "react";
import styles from "./select-trigger.module.scss";

interface SelectTriggerProps {
  displayValue: string;
  placeholder: string;
  isOpen: boolean;
  hasError: boolean;
  onClick: () => void;
}

export const SelectTrigger = memo(
  ({
    displayValue,
    placeholder,
    isOpen,
    hasError,
    onClick,
  }: SelectTriggerProps) => (
    <div
      className={`${styles.container}
      ${hasError ? `${styles.error}` : ""}
      ${isOpen ? `${styles.open}` : ""}`}
      onClick={onClick}
    >
      <span className={`body-m-bold`}>{displayValue || placeholder}</span>
    </div>
  )
);

SelectTrigger.displayName = "SelectTrigger";
