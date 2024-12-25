import Iconinput from "./icon-input.module.scss";
import Image from "next/image";
import Input from "../input/input";
//image import
import EyeIcon from "../../../../public/images/eye.svg";
import DateIcon from "../../../../public/images/date.svg";



const IconInput = ({ variant, ...restProps }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  // Define the icon based on the variant
  let icon;
  if (variant === "date") {
    icon = <Image src={DateIcon} className={Iconinput.icon} alt="Date" />;
  } else if (variant === "eye") {
    icon = <Image src={EyeIcon} className={Iconinput.icon} alt="Eye"/>;
  }

  return (
    <div className={Iconinput.icon_input}>
      <Input {...restProps}></Input>
      {icon}
    </div>
  );
};

export default IconInput;
