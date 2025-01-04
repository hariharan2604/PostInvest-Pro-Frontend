import Iconinput from "./icon-input.module.scss";
import Image from "next/image";
import Input from "../input/input";
// Image imports
import EyeOpen from "../../../../public/images/eye-open.svg";
import EyeClose from "../../../../public/images/eye-close.svg";
import { useState } from "react";

const PasswordInput = ({ ...restProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle toggle for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={Iconinput.icon_input}>
      <Input
        {...restProps}
        type={passwordVisible ? "text" : "password"}
        name="password"
        labelText="Password"
        placeholder="Enter your password"
      />
      <Image
        src={passwordVisible ? EyeOpen : EyeClose}
        className={Iconinput.icon}
        alt={passwordVisible ? "Hide password" : "Show password"}
        onClick={togglePasswordVisibility}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default PasswordInput;
