import Radiobtnstyle from "./radiobutton.module.scss";

export default function RadioButton({ variant, id, name, labeltext, lotText, value, checkedValue, onChange }) {
  let classSet = ``;

  if (variant === "radiobtns") {
    classSet += `${Radiobtnstyle.radiobtns} `;
  } else if (variant === "lotpills") {
    classSet += `${Radiobtnstyle.lotbtns} `;
  }

  return (
    <>
      {variant === "radiobtns" ? (
        <div className={classSet}>
          <label className={Radiobtnstyle["radio-button"]}>
            <input
              type="radio"
              name={name}
              id={id}
              value={value}
              checked={checkedValue === value}
              onChange={onChange}
            />
            <span className={Radiobtnstyle["radio"]}></span>
            <span className={Radiobtnstyle["label"]}>{labeltext}</span>
          </label>
        </div>
      ) : (
        <div className={classSet}>
          <input
            type="radio"
            name={name}
            id={id}
            value={value}
            checked={checkedValue === value}
            onChange={onChange}
          />
          <label htmlFor={id} className={checkedValue === value ? Radiobtnstyle.checked : ""}>{lotText}</label>
        </div>
      )}
    </>
  );
}
