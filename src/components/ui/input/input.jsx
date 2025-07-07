"use client";
import styles from "./input.module.scss";

const Input = ({
  type = "text",
  variant = "label",
  labelText,
  onChange,
  value,
  name,
  errorText,
  ...restProps
}) => {
  const inputClass = variant === "plain" ? styles.plainInput : "";
  const isDisabled = variant === "disabled";

  return (
    <>
      <div className={styles.inputSection}>
        <div className={`${styles.inputGroup} ${inputClass}`}>
          <input
            type={type}
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
};

export default Input;
