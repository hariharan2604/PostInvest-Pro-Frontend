"use client";
import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import DateIcon from "@icons/date.svg";
import leftArrow from "@icons/leftCalender.svg";
import rightArrow from "@icons/rightCalender.svg";
import styles from "./CustomDatePicker.module.scss";

const CustomDatePicker = ({ selectedDate, onChange, label, errorText }) => {
  const range = (start, end, step = 1) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  };

  const [isFocused, setIsFocused] = useState(false);

  const years = range(1940, new Date().getFullYear() + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <>
      <div
        className={`${styles.customDatePickerContainer} ${isFocused || selectedDate ? styles.active : ""}`}
      >
        <label className={styles.customDatePickerLabel}>{label}</label>
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f5f5f5",
              }}
            >
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{
                  background: "transparent",
                  margin: "10px",
                  border: "none",
                  cursor: prevMonthButtonDisabled ? "not-allowed" : "pointer",
                  opacity: prevMonthButtonDisabled ? 0.5 : 1,
                }}
              >
                <Image src={leftArrow} alt="Previous" />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Select
                  options={months.map((month, index) => ({
                    value: index,
                    label: month,
                  }))}
                  value={{
                    value: new Date(date).getMonth(),
                    label: months[new Date(date).getMonth()],
                  }}
                  onChange={(selectedOption) => changeMonth(selectedOption.value)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minWidth: "120px",
                      fontSize: "14px",
                    }),
                  }}
                />
                <Select
                  options={years.map((year) => ({ value: year, label: year }))}
                  value={{
                    value: new Date(date).getFullYear(),
                    label: new Date(date).getFullYear(),
                  }}
                  onChange={(selectedOption) => changeYear(selectedOption.value)}
                  styles={{
                    control: (base) => ({
                      ...base,
                      minWidth: "80px",
                      fontSize: "14px",
                    }),
                  }}
                />
              </div>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                style={{
                  background: "transparent",
                  margin: "10px",
                  border: "none",
                  cursor: nextMonthButtonDisabled ? "not-allowed" : "pointer",
                  opacity: nextMonthButtonDisabled ? 0.5 : 1,
                }}
              >
                <Image src={rightArrow} alt="Next" />
              </button>
            </div>
          )}
          maxDate={new Date()}
          todayButton="Today"
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          closeOnScroll={true}
          customInput={<CustomInput />}
          popperContainer={({ children }) => <div>{children}</div>} // ✅ added fix
        />
        <Image className={styles.DateIcon} src={DateIcon} alt="Custom Date" />
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

CustomInput.displayName = "CustomInput";
CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
