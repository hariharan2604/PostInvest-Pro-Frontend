import React, { useState } from "react";

import styles from "./cheque-leaf.module.scss";
import Pill from "@/components/ui/pill/pill";
import Profile from "@/components/ui/profile/profile";
import {
  ModalHeader,
  Modal,
  ModalContent,
  ModalFooter,
} from "@/components/ui/model/model";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import SuccessModal from "@/components/ui/success-modal/success-modal";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import Title from "@/components/ui/title/title";
const data = [
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
    pillVariant: "pillOrange",
    pillNumber: "15",
    pillText: "Leaf",
    profileStatus: "disable",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillRed",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "disable",
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
    pillNumber: "15",
    pillText: "Leaf",
    profileStatus: "disable",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillRed",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "disable",
  },
  {
    userName: "Annasamy",
    userPhone: "+91 987654321",
    pillVariant: "pillOrange",
    pillNumber: "5",
    pillText: "Leaf",
    profileStatus: "active",
  },
];

export default function ChequeLeaf() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chequeSelected, setchequeSelected] = useState(false);
  const [addmore, setaddmore] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', selectedDate)
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [inputFields, setInputFields] = useState([
    { field1: '', field2: '', field: '3', field: '4' }
  ]);
  const handleAddFields = () => {
    setInputFields([...inputFields, { field1: '', field2: '' }]);
  };
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
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

  const handleRadioChange = (event, value) => {
    setCheckedValue(event.target.value);
    console.log(event.target.value);

    if (event.target.value === 'Cheque' || event.target.value === 'single' || event.target.value === 'multiple') {
      setchequeSelected(true);
    }
    else {
      setchequeSelected(false);
    }

    if (event.target.value === 'multiple') {
      setaddmore(true);
    }
    else {
      setaddmore(false);
    }
  };
  return (
    <div className={styles.cheque}>
      <div className={styles["cheque-head"]}>
        {/* <Title titleValue="Cheque Leaf" /> */}
        <h3>Cheque Leaf</h3>
      </div>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalHeader
          title="Collection Pending"
          subTitle="Please fill the cheque details"
          showButton={true}
          onClose={handleCloseModal}
        />
        <ModalContent>
          <div className={styles["flex-class"]}>
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
            {chequeSelected && <div className={styles["radioGroup"]}>
              <RadioButton
                variant="radiobtns"
                id="Cheque"
                name="paymentMethod"
                labeltext="Single"
                value="single"
                checkedValue={checkedValue}
                onChange={handleRadioChange}
              />
              <RadioButton
                variant="radiobtns"
                id="Cash"
                name="paymentMethod"
                labeltext="Multiple"
                value="multiple"
                checkedValue={checkedValue}
                onChange={handleRadioChange}
              />
            </div>}
          </div>
          {inputFields.map((inputField, index) => (
            <div key={index} className={styles["border-top"]}>
              <div className={styles["from-group"]}>
                <Input labelText="CHQ Number" name="field1" value={inputField.field1}></Input>
              </div>
              <div className={styles["from-group"]}>
                <Input labelText="Amount" name="field2" value={inputField.field2}></Input>
              </div>
              <div className={styles["from-group"]}>
                <Input labelText="Bank Name" name="field3" value={inputField.field3} ></Input>
              </div>
              <div className={styles["from-group"]}>
                <Input labelText="Account Number" name="field14" value={inputField.field4}></Input>
              </div>
              <div className={styles["from-group"]}>
                <CustomDatePicker
                  selectedDate={selectedDate}
                  onChange={handleDateChange}
                  label="DD/ MM/YYYY"
                />
              </div>

            </div>
          ))}
          {addmore ? <Button variant="linkButton" onClick={handleAddFields} margintop="20px">Add More</Button> : ""}

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
  );
}
