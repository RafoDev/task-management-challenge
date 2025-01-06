import React, { ReactElement, useCallback, useRef, useState } from "react";
import { SelectContext } from "./context/select-context";
import { SelectComponent, SelectProps } from "./types";
import { useOutsideClick } from "./hooks/use-outside-click";
import {
  Option,
  CheckboxOption,
  SelectOptions,
  SelectTrigger,
} from "./components";
import styles from "./select.module.scss";

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      value,
      onChange,
      onBlur = () => {},
      placeholder = "Select...",
      error,
      className = "",
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useOutsideClick(selectRef, () => setIsOpen(false));

    const getDisplayValue = useCallback(() => {
      if (multiple) {
        const selectedValues = React.Children.toArray(children)
          .filter((child) => {
            const childElement = child as ReactElement;
            return (
              Array.isArray(value) && value.includes(childElement.props.value)
            );
          })
          .map((child) => (child as ReactElement).props.children);

        if (!selectedValues.length) return "";
        if (selectedValues.length === 1) return selectedValues[0];
        return `${selectedValues.length} items selected`;
      }

      const selectedChild = React.Children.toArray(children).find(
        (child) => (child as ReactElement).props.value === value
      ) as ReactElement;

      return selectedChild ? selectedChild.props.children : "";
    }, [children, value, multiple]);

    const contextValue = {
      isOpen,
      setIsOpen,
      value,
      onChange,
      onBlur,
      multiple,
    };

    return (
      <SelectContext.Provider value={contextValue}>
        <div className={styles.container} ref={selectRef} {...props}>
          <SelectTrigger
            displayValue={getDisplayValue()}
            placeholder={placeholder}
            isOpen={isOpen}
            hasError={!!error}
            onClick={() => setIsOpen(!isOpen)}
          />

          {isOpen && <SelectOptions>{children}</SelectOptions>}
        </div>
      </SelectContext.Provider>
    );
  }
) as SelectComponent;

Select.displayName = "Select";
Select.Option = Option;
Select.CheckboxOption = CheckboxOption;

export default Select;
