import { memo, useCallback } from "react";
import { OptionProps } from "../../types";
import { useSelectContext } from "../../hooks/use-select-context";
import styles from "./option.module.scss";

export const Option = memo<OptionProps>(({ value, children }) => {
  const {
    value: selectedValue,
    onChange,
    onBlur,
    setIsOpen,
    multiple,
  } = useSelectContext();

  if (multiple) {
    console.warn("Use CheckboxOption for multiple selection");
    return null;
  }

  const isSelected = selectedValue === value;

  const handleSelect = useCallback(() => {
    onChange(value);
    onBlur();
    setIsOpen(false);
  }, [onChange, onBlur, setIsOpen, value]);

  return (
    <div
      className={`${styles.container}
          ${isSelected ? `${styles.selected}` : ""}
        `}
      onClick={handleSelect}
    >
      <div className={styles.label}>{children}</div>
    </div>
  );
});

Option.displayName = "Option";
