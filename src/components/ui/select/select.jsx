"use client";
import SelectStyle from "./select.module.scss";
import React from "react";
import Select from "react-select";

export default function Selectdropdown({
  options,
  selectText,
  selectedOption,
  setSelectedOption,
  errorText,
}) {
  return (
    <>
      <div className={SelectStyle["inputGroup"]}>
        <Select
          className={SelectStyle["custom_select"]}
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
          placeholder=""
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              height: "60px",
              border: "1px solid #DDDDDD",
              borderRadius: "10px",
              fontFamily: "var(--font-inter), sans-serif",
              boxShadow: "none",
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
              fontFamily: "var(--font-inter), sans-serif",
            }),
            menu: (base) => ({
              ...base,
              marginTop: 4,
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
              border: "1px solid #e0e0e0",
              fontFamily: "var(--font-inter), sans-serif",
              zIndex: 9999,
              overflow: "hidden",
            }),
            menuList: (base) => ({
              ...base,
              padding: 0,
              maxHeight: "200px",
              overflowY: "auto",
            }),
            option: (base, state) => ({
              ...base,
              padding: "12px 16px",
              fontSize: "14px",
              fontFamily: "var(--font-inter), sans-serif",
              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
              color: "#000",
              cursor: "pointer",
              ":active": {
                backgroundColor: "#e6f0ff",
              },
            }),
          }}
        />
        <label
          htmlFor=""
          className={`${SelectStyle["floating_label"]} ${selectedOption ? SelectStyle["selected"] : ""
            }`}
        >
          {selectText}
        </label>
      </div>
      {errorText && <div className={SelectStyle.errorText}>{errorText}</div>}
    </>
  );
}
