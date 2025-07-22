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

const CustomDatePicker = React.forwardRef(function CustomDatePicker(
  { selectedDate, onChange, label, errorText },
  ref
) {
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
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      fontSize: "14px",
      backgroundColor: "#fff",
      borderColor: state.isFocused ? "#ccc" : "#ddd",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#bbb",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      fontSize: "14px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#e0e0e0"
        : state.isFocused
          ? "#f0f0f0"
          : "#fff",
      color: "#333",
      fontSize: "14px",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 6px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0 6px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <>
      <div
        ref={ref}
        className={`${styles.customDatePickerContainer} ${isFocused || selectedDate ? styles.active : ""}`}
      >
        <label className={styles.customDatePickerLabel}>{label}</label>
        <DatePicker
          fixedHeight
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
              onMouseDown={(e) => e.stopPropagation()}
              style={{
                margin: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                  styles={customSelectStyles}
                  menuPortalTarget={document.querySelector("#datepicker-portal")}
                  menuPosition="fixed"
                  options={months.map((month, index) => ({
                    value: index,
                    label: month,
                  }))}
                  value={{
                    value: new Date(date).getMonth(),
                    label: months[new Date(date).getMonth()],
                  }}
                  onChange={(selectedOption) => changeMonth(selectedOption.value)}
                />
                <Select
                  styles={customSelectStyles}
                  menuPortalTarget={document.querySelector("#datepicker-portal")}
                  menuPosition="fixed"
                  options={years.map((year) => ({ value: year, label: year }))}
                  value={{
                    value: new Date(date).getFullYear(),
                    label: new Date(date).getFullYear(),
                  }}
                  onChange={(selectedOption) => changeYear(selectedOption.value)}
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
          onCalendarOpen={() => setIsFocused(true)}
          onCalendarClose={() => setIsFocused(false)}
          closeOnScroll
          customInput={<CustomInput />}
          portalId="datepicker-portal"
        />
        <Image className={styles.DateIcon} src={DateIcon} alt="Custom Date" />
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </>
  );
});

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button className={styles.customDatePickerInput} onClick={onClick} ref={ref}>
    {value}
  </button>
));

CustomInput.displayName = "CustomInput";
CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
