import React, { useState } from "react";
import styles from "@/containers/cheque-leaf/cheque-leaf.module.scss";
import Pill from "@/components/ui/pill/pill";
import Profile from "@/components/ui/profile/profile";
import Title from "@/components/ui/title/title";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@/components/ui/model/model";
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import SuccessModal from "@/components/ui/success-modal/success-modal";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
const data = [
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillRed",
    pillNumber: "1",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillRed",
    pillNumber: "1",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillRed",
    pillNumber: "1",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillOrange",
    pillNumber: "3",
    pillText: "Leaf",
    profileStatus: "active",
  },

  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillOrange",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillOrange",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillGreen",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillGreen",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillGreen",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
];

export default function ViewChequeLeaf() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', selectedDate)
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getDataFunctions = () => {
    console.log("Done button clicked");
    setIsModalOpen(true);
    setModalOpen2(true);
  };

  function SecondModalClose() {
    setModalOpen2(false);
  }

  //radio button check
  const [checkedValue, setCheckedValue] = useState("");

  const handleRadioChange = (event) => {
    setCheckedValue(event.target.value);
  };
  return (
    <>
      <div className={styles.cheque}>
        <Title titleValue={"20 Leaf"} />
        <div
          className={styles["cheque-inner"]}
          onClick={() => setIsModalOpen(true)}
        >
          {data.map((user, index) => (
            <div key={index} className={styles["userDetails"]}>
              <div className={styles["split"]}>
                <Profile
                  variant="profileIcon"
                  profileStatus={user.profileStatus}
                />

                <div className={styles["userInfo"]}>
                  <p className={styles["userName"]}>{user.userName}</p>
                  <p className={styles["userPhone"]}>{user.userPhone}</p>
                </div>
              </div>
              <div className={styles["pillStatus"]}>
                <Pill
                  variant={user.pillVariant}
                  pillNumber={user.pillNumber}
                  pillText={user.pillText}
                  pillIcon={false}
                />
              </div>
            </div>
          ))}
        </div>
        {/* //model */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalHeader
            title="Collection Pending"
            subTitle="Please fill the cheque details"
            showButton={true}
            onClose={handleCloseModal}
          />
          <ModalContent>
            <div className={styles["radioGroup"]}>

              <RadioButton
                variant="radiobtns"
                id="Cheque"
                name="paymentMethod"
                labeltext="Cheque"
                value="Cheque"
                checkedValue={checkedValue}
                onChange={handleRadioChange}
              />
              <RadioButton
                variant="radiobtns"
                id="Cash"
                name="paymentMethod"
                labeltext="Cash"
                value="Cash"
                checkedValue={checkedValue}
                onChange={handleRadioChange}
              />
            </div>
            <div className={styles["from-group"]}>
              <Input labelText="CHQ Number" name="che_number"></Input>
            </div>
            <div className={styles["from-group"]}>
              <Input labelText="Amount" name="amount"></Input>
            </div>
            <div className={styles["from-group"]}>
              <Input labelText="Bank Name" name="bank_name"></Input>
            </div>
            <div className={styles["from-group"]}>
              <Input labelText="Account Number" name="account_number"></Input>
            </div>
            <div className={styles["from-group"]}>
              <CustomDatePicker
                selectedDate={selectedDate}
                onChange={handleDateChange}
                label="Account Number"
              />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={getDataFunctions}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={isModalOpen2}>
          <SuccessModal
            onClose={SecondModalClose}
            successTitle="Check details Updated"
            successContent="The customer's cheque has been collected by our agent."
            variant="withfooter"
          />
        </Modal>
      </div>
    </>
  );
}
