"use client"
import Dashcardstyle from "./dashcard.module.scss";

export default function Dashcard({ totalValue, SubValue, variant }) {
  return (
    <>
      <div className={Dashcardstyle["flexCard"]}>
        <div className={Dashcardstyle["card"]}>
          <p className={Dashcardstyle[variant]}>{totalValue}</p>
          <span className={Dashcardstyle["DayGap"]}>{SubValue}</span>
        </div>
      </div>
    </>
  );
}
