"use client"
import { useState, useEffect } from "react";
import styles from "./input.module.scss";

const Input = ({ type = "text", variant = "label", labelText, onChange, value, name, defaultValue, errorText, ...restProps }) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    if (variant === "disabled") {
      setInputValue(defaultValue || "");
    }
  }, [variant, defaultValue]);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
    setInputValue(event.target.value);
  };

  const inputClass = variant === "plain" ? styles.plainInput : "";
  const isDisabled = variant === "disabled";

  return (
    <><div className={styles.inputSection}>
      <div className={`${styles.inputGroup} ${inputClass}`}>
        <input
          type={type}
          required
          autoComplete="off"
          onChange={handleChange}
          name={name}
          id={name}
          placeholder={labelText}
          value={inputValue}
          disabled={isDisabled}
          {...restProps}
        />
        {variant !== "plain" && <label htmlFor={name}>{labelText}</label>}
      </div>
    </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}</>
  );
};

export default Input;
