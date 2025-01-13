'use client'
import styles from "./remittance-view.module.scss";
import { useState } from "react";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import DividerLine from "@/components/ui/divider-line/divider-line";
import Profile from "@/components/ui/profile/profile";
import Calender from "../calendar/Calender";
import Pill from "@/components/ui/pill/pill";

export default function RemittanceView() {
  const data = [
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "RD",
      lot: "lot1",
      amount: 10000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillRed",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "PF",
      lot: "lot1",
      amount: 10000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "FD",
      lot: "lot1",
      amount: 1000,
    },
    {
      userName: "Rithika",
      pillVariant: "pillOrange",
      userAcoount: "#000132596",
      pillNumber: "3",
      pillText: "Days",
      paymentMode: "text",
      funds: "FD",
      lot: "lot2",
      amount: 15000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "5",
      pillText: "Days",
      paymentMode: "text",
      funds: "PF",
      lot: "lot2",
      amount: 20000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillRed",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "Rd",
      lot: "lot1",
      amount: 10000,
    },
    {
      userName: "Rithika",
      pillVariant: "pillOrange",
      userAcoount: "#000132596",
      pillNumber: "3",
      pillText: "Days",
      paymentMode: "text",
      funds: "FD",
      lot: "lot2",
      amount: 15000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "5",
      pillText: "Days",
      paymentMode: "text",
      funds: "PF",
      lot: "lot2",
      amount: 20000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillOrange",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "Rd",
      lot: "lot1",
      amount: 10000,
    },
    {
      userName: "Rithika",
      pillVariant: "pillOrange",
      userAcoount: "#000132596",
      pillNumber: "3",
      pillText: "Days",
      paymentMode: "text",
      funds: "FD",
      lot: "lot2",
      amount: 15000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "5",
      pillText: "Days",
      paymentMode: "text",
      funds: "PF",
      lot: "lot2",
      amount: 20000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "1",
      pillText: "Day",
      paymentMode: "text",
      funds: "Rd",
      lot: "lot1",
      amount: 10000,
    },
    {
      userName: "Rithika",
      pillVariant: "pillOrange",
      userAcoount: "#000132596",
      pillNumber: "3",
      pillText: "Days",
      paymentMode: "text",
      funds: "FD",
      lot: "lot2",
      amount: 15000,
    },
    {
      userName: "Annasamy",
      pillVariant: "pillGreen",
      userAcoount: "#000132596",
      pillNumber: "5",
      pillText: "Days",
      paymentMode: "text",
      funds: "PF",
      lot: "lot2",
      amount: 20000,
    },
  ];

  const [selectedLot, setSelectedLot] = useState("lot1");

  const handleRadioChange = (event) => {
    setSelectedLot(event.target.value);
  };

  const filteredData = data.filter((item) => item.lot === selectedLot);
  const totalAmount = filteredData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <Calender />
      <div className={styles["pillGroup"]}>
        <RadioButton
          variant="lotpills"
          id="lot1"
          name="lot"
          lotText="Lot 01 - BK"
          value="lot1"
          checkedValue={selectedLot}
          onChange={handleRadioChange}
        />
        <RadioButton
          variant="lotpills"
          id="lot2"
          name="lot"
          lotText="Lot 02 - P1"
          value="lot2"
          checkedValue={selectedLot}
          onChange={handleRadioChange}
        />
      </div>
      <div className={styles.titlesection}>
        <div>
          <h3>Other Bank</h3>
        </div>
        <div className={styles.remittance}>
          <p>Overall Due Amount</p>
          <h3>
            <small>{filteredData.length} items</small> ₹{totalAmount.toLocaleString()}
          </h3>
        </div>
      </div>
      <DividerLine />
      <div className={styles["maturityDue"]}>
        <div className={styles["due-inner"]}>
          {filteredData.map((user, index) => (
            <div key={index} className={styles["userDetails"]}>
              <div className={styles["split"]}>
                <Profile variant="profileText" profileText={user.funds} />
                <div className={styles["userInfo"]}>
                  <label className={styles["userAccount"]}>
                    {user.userAcoount}
                  </label>
                  <p className={styles["userName"]}>{user.userName}</p>
                </div>
              </div>
              <div className={styles["pillStatus"]}>
                <Pill
                  variant={user.pillVariant}
                  pillNumber={user.pillNumber}
                  pillText={user.pillText}
                  paymentMode={user.paymentMode}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
