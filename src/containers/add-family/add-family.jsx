"use client"
import React, { useState } from "react";
import style from "./add-family.module.scss";
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import Selectdropdown from "@/components/ui/select/select";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
export default function AddFamily() {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', selectedDate)
  };

  const options = [
    { value: "chennai", label: "chennai" },
    { value: "Kerala", label: "Kerala" },
    { value: "goa", label: "goa" },
  ];
  const options1 = [
    { value: "opition 1", label: "opition 1" },
    { value: "opition 2", label: "opition 2" },
    { value: "opition 3", label: "opition 3" },
  ];
  return (
    <>
      <div className={style["form-group"]}>
        <Input labelText="Customer Name" name="customer_name" variant="disabled" defaultValue="Aadhavan" />
      </div>

      <div className={style["form-group"]}>
        {/* <Input labelText="Relationship " name="mobile" /> */}
        {/* <Selectdropdown></Selectdropdown> */}
        <Selectdropdown options={options1} selectText="Select Customer"></Selectdropdown>

      </div>
      <div className={style["form-group"]}>
        <Input labelText="Full Name" name="full_name" />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Mobile No" name="mobile" />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Email ID" name="email" />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Gender" name="gender" />
      </div>
      <div className={style["form-group"]}>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
          label="Date of Birth"
        />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Address" name="address" />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Area" name="area" />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Zip" name="zip" />
      </div>
      <div className={style["form-group"]}>
        {/* <Input labelText="State" name="state" /> */}
        {/* <Selectdropdown></Selectdropdown> */}
        <Selectdropdown options={options} selectText="Select State"></Selectdropdown>

      </div>

      <div className={style["buttonGroup"]}>
        <Button variant="outline" path="/customer">Cancel</Button>
        <Button variant="primary" path="/customer-info">Save</Button>
      </div>
    </>
  );
}
