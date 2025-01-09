import React, { useState } from 'react';
import Image from "next/image";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateIcon from "@icons/date.svg";
import styles from './CustomDatePicker.module.scss';

const CustomDatePicker = ({ selectedDate, onChange, label, errorText }) => {

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(true);
  };

  return (
    <>
      <div className={`${styles.customDatePickerContainer} ${isFocused || selectedDate ? styles.active : ''}`}>
        <label className={styles.customDatePickerLabel}>{label}</label>
        <DatePicker
          maxDate={new Date()}
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          onFocus={handleFocus}
          onBlur={handleBlur}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          closeOnScroll={true}
          customInput={<CustomInput />}
        />
        <Image className={styles.DateIcon} src={DateIcon} alt='Custom Date' />
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </>
  );
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className={styles.customDatePickerInput} onClick={onClick} ref={ref}>
    {value}
  </button>
));

CustomInput.displayName = 'CustomInput'; // Set displayName for the forwardRef component

CustomDatePicker.displayName = 'CustomDatePicker';
export default CustomDatePicker;
