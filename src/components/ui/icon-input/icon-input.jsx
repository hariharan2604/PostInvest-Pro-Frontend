"use client"
import React, { useState } from "react";
import Iconinput from "./icon-input.module.scss";
import Image from "next/image";
import Input from "../input/input";
// Image imports
import EyeOpen from "@icons/eye-open.svg";
import EyeClose from "@icons/eye-close.svg";

const PasswordInput = React.forwardRef(({
  name = "password", labelText = "Password",
  placeholder = "Enter your password", errorText, ...restProps
}, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle toggle for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <><div className={Iconinput.icon_input}>
      <Input
        {...restProps}
        type={passwordVisible ? "text" : "password"}
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        value={restProps.value}
        ref={ref}
      />

      <Image
        src={passwordVisible ? EyeOpen : EyeClose}
        className={Iconinput.icon}
        alt={passwordVisible ? "Hide password" : "Show password"}
        onClick={togglePasswordVisibility}
        style={{ cursor: "pointer" }}
      />
    </div>
      {errorText && <div className={Iconinput.errorText}>{errorText}</div>}</>
  );
});

export default PasswordInput;
