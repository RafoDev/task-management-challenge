import { memo } from "react";
import styles from "./select-trigger.module.scss";

type SelectTriggerProps = {
  displayValue: string;
  placeholder: string;
  isOpen: boolean;
  hasError: boolean;
  onClick: () => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const SelectTrigger = memo(
  ({
    displayValue,
    placeholder,
    isOpen,
    hasError,
    onClick,
    icon: PlaceholderIcon,
  }: SelectTriggerProps) => {
    return (
      <div
        className={`${styles.container}
      ${hasError ? `${styles.error}` : ""}
      ${isOpen ? `${styles.open}` : ""}`}
        onClick={onClick}
      >
        {displayValue ? (
          <span className={`${styles.placeholder} body-m-bold`}>
            {displayValue}
          </span>
        ) : (
          <span className={`${styles.placeholder} body-m-bold`}>
            {PlaceholderIcon && <PlaceholderIcon className={styles.icon} />}{" "}
            {placeholder}
          </span>
        )}
      </div>
    );
  }
);

SelectTrigger.displayName = "SelectTrigger";
