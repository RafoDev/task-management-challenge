import { memo, useCallback } from "react";
import { OptionProps } from "../../types";
import { useSelectContext } from "../../hooks/use-select-context";
import styles from "./option.module.scss";

export const CheckboxOption = memo<OptionProps>(({ value, children }) => {
  const {
    value: selectedValues = [],
    onChange,
    onBlur,
    multiple,
  } = useSelectContext();

  if (!multiple) {
    console.warn("Use Option for single selection");
    return null;
  }

  const isSelected =
    Array.isArray(selectedValues) && selectedValues.includes(value);

  const handleSelect = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!Array.isArray(selectedValues)) return;

      const newValue = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      onChange(newValue);
      onBlur();
    },
    [selectedValues, onChange, onBlur, value, isSelected]
  );

  return (
    <div className={styles.container} onClick={handleSelect}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}}
        className={styles.checkbox}
      />
      <span className={styles.label}>{children}</span>
    </div>
  );
});

CheckboxOption.displayName = "CheckboxOption";
