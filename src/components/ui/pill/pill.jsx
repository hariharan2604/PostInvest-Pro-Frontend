import pillStyles from "./pill.module.scss";

import cashIcon from "@icons/coinIcon.svg";
import Image from "next/image";

export default function Pill({ variant, pillNumber, pillText, paymentMode }) {
  let pillSet = `${pillStyles.pill} `;

  if (variant === "pillRed") {
    pillSet += `${pillStyles.pillRed} `;
  } else if (variant === "pillOrange") {
    pillSet += `${pillStyles.pillOrange} `;
  } else if (variant === "pillGreen") {
    pillSet += `${pillStyles.pillGreen} `;
  }

  return (
    <div className={pillSet}>
      {paymentMode === "cash" ? (
        <Image src={cashIcon} alt="icon" />
      ) : (
        <h3>{pillNumber}</h3>
      )}
      <p>{pillText}</p>
    </div>
  );
}
