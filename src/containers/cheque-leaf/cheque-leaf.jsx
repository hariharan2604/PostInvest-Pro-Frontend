"use client";
import React, { useState } from "react";

import styles from "./cheque-leaf.module.scss";
import Pill from "@/components/ui/pill/pill";
import Profile from "@/components/ui/profile/profile";
import InfoModal from "@/components/ui/info-modal/info-modal";
import Button from "@/components/ui/button/button";

import CollectionPendingModal from "../CollectionPendingModal/CollectionPendingModal";

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
  const [chequeSelected, setChequeSelected] = useState(false);
  const [addmore, setAddMore] = useState(false);

  const [inputFields, setInputFields] = useState([
    { field1: "", field2: "", field3: "", field4: "" },
  ]);

  const [checkedValue, setCheckedValue] = useState("");

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setCheckedValue(value);
    setChequeSelected(value === "Cheque" || value === "single" || value === "multiple");
    setAddMore(value === "multiple");
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { field1: "", field2: "", field3: "", field4: "" }]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getDataFunctions = () => {
    console.log("Done button clicked");
    setIsModalOpen(false);
    setModalOpen2(true);
  };

  function SecondModalClose() {
    setModalOpen2(false);
  }

  return (
    <div className={styles.cheque}>
      <div className={styles["cheque-head"]}>
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

      <CollectionPendingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={getDataFunctions}
        checkedValue={checkedValue}
        handleRadioChange={handleRadioChange}
        chequeSelected={chequeSelected}
        addmore={addmore}
        inputFields={inputFields}
        handleInputChange={handleInputChange}
        handleAddFields={handleAddFields}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />

      <InfoModal
        onOpen={isModalOpen2}
        showButton={false}
        onClose={SecondModalClose}
        Title="Check details Updated"
        Content="The customer's cheque has been collected by our agent."
      >
        <Button variant="outline" onClick={SecondModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={SecondModalClose}>
          Add More Cheque
        </Button>
      </InfoModal>
    </div>
  );
}
