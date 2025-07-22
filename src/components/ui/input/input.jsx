"use client";
import React from "react";
import styles from "./input.module.scss";

const Input = React.forwardRef(({
  type = "text",
  variant = "label",
  labelText,
  onChange,
  value,
  name,
  errorText,
  ...restProps
}, ref) => {
  const inputClass = variant === "plain" ? styles.plainInput : "";
  const isDisabled = variant === "disabled";

  return (
    <>
      <div className={styles.inputSection}>
        <div className={`${styles.inputGroup} ${inputClass}`}>
          <input
            type={type}
            ref={ref}
            required
            autoComplete="off"
            onChange={(e) => onChange?.(e.target.value)}
            name={name}
            id={name}
            placeholder={labelText}
            value={value || ""}
            disabled={isDisabled}
            {...restProps}
          />
          {variant !== "plain" && <label htmlFor={name}>{labelText}</label>}
        </div>
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </>
  );
});

export default Input;
