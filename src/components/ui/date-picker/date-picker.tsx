import ReactDatePicker from "react-datepicker";
import styles from "./date-picker.module.scss";
import "./custom-date-picker.scss";
import CalendarIcon from "/src/assets/icons/calendar.svg?react";
import { forwardRef } from "react";

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
  onChange?: () => void;
  placeholder?: string;
};

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange, placeholder }, ref) => (
    <div className={styles.inputContainer}>
      <CalendarIcon className={styles.icon} />
      <input
        type="text"
        ref={ref}
        className={`${styles.input} body-m-bold`}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
      />
    </div>
  )
);

CustomInput.displayName = "CustomInput";

type DatePickerProps = {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  onBlur?: () => void;
  placeholder?: string;
};

const DatePicker = ({
  selected,
  onChange,
  onBlur,
  placeholder = "Due date",
}: DatePickerProps) => {
  return (
    <div>
      <ReactDatePicker
        wrapperClassName={styles.datePicker}
        placeholderText={placeholder}
        selected={selected}
        onChange={onChange}
        onBlur={onBlur}
        dateFormat="MMM. d yyyy"
        customInput={<CustomInput placeholder={placeholder} />}
        popperClassName={styles.popper}
        calendarClassName={styles.calendar}
      />
    </div>
  );
};

export default DatePicker;
