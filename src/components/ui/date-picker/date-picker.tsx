import ReactDatePicker from "react-datepicker";
import styles from "./date-picker.module.scss";
import "./custom-date-picker.scss";
import CalendarIcon from "/src/assets/icons/calendar.svg?react";
import LeftArrowIcon from "/src/assets/icons/left-arrow.svg?react";
import DoubleLeftArrowIcon from "/src/assets/icons/double-left-arrow.svg?react";
import RightArrowIcon from "/src/assets/icons/right-arrow.svg?react";
import DoubleRightArrowIcon from "/src/assets/icons/double-right-arrow.svg?react";
import { forwardRef } from "react";
import { getMonth } from "date-fns";

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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DatePicker = ({
  selected,
  onChange,
  onBlur,
  placeholder = "Due date",
}: DatePickerProps) => {
  return (
    <div className={styles.wrapper}>
      <ReactDatePicker
        todayButton="Today"
        placeholderText={placeholder}
        selected={selected}
        onChange={onChange}
        onBlur={onBlur}
        dateFormat="MMM. d yyyy"
        customInput={<CustomInput placeholder={placeholder} />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          increaseYear,
          decreaseYear,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          prevYearButtonDisabled,
          nextYearButtonDisabled,
        }) => (
          <div className={styles.header}>
            <button
              onClick={decreaseYear}
              disabled={prevYearButtonDisabled}
              className={styles.button}
            >
              <DoubleLeftArrowIcon className={styles.arrow} />
            </button>
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={styles.button}
            >
              <LeftArrowIcon className={styles.arrow} />
            </button>

            <span className={styles.month}>{months[getMonth(date)]}</span>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={styles.button}
            >
              <RightArrowIcon className={styles.arrow} />
            </button>
            <button
              onClick={increaseYear}
              disabled={nextYearButtonDisabled}
              className={styles.button}
            >
              <DoubleRightArrowIcon className={styles.arrow} />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default DatePicker;
