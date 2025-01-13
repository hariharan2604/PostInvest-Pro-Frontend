"use client"
import SelectStyle from "./select.module.scss";
import React, { useState } from "react";
import Select from "react-select";

export default function Selectdropdown({ options, selectText, selectedOption, setSelectedOption, errorText }) {
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
            control: (baseStyles, state) => ({
              ...baseStyles,
              height: "60px",
              border: "1px solid #DDDDDD",
              borderRadius: "10px",

              ":hover": {
                borderColor: "unset",
                border: "1px solid #DDDDDD",
                boxShadow: "unset",
                outline: "unset",
              },
            }),
          }}
        />
        <label
          htmlFor=""
          className={`${SelectStyle["floating_label"]} ${selectedOption ? SelectStyle["selected"] : ""}`}
        >
          {selectText}
        </label>
      </div>
      {errorText && <div className={SelectStyle.errorText}>{errorText}</div>}
    </>
  );
}
