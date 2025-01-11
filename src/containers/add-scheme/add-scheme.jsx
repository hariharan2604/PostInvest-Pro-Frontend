

import schemeStyle from "./add-scheme.module.scss";
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import Selectdropdown from "@/components/ui/select/select";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import React, { useState } from "react";

export default function AddScheme() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', selectedDate)
  };

  const options1 = [
    { value: "opition 1", label: "opition 1" },
    { value: "opition 2", label: "opition 2" },
    { value: "opition 3", label: "opition 3" },
  ];
  const options = [
    { value: "opition 1", label: "opition 1" },
    { value: "opition 2", label: "opition 2" },
    { value: "opition 3", label: "opition 3" },
  ];
  return (
    <>
      <div className={schemeStyle["schemeGroup"]}>
        <div className={schemeStyle["form-group"]}>
          {/* <Input labelText="Select Customer" name="select-customer" /> */}
          <Selectdropdown options={options1} selectText="Select Customer"></Selectdropdown>
        </div>
        <div className={schemeStyle["form-group"]}>
          {/* <Input labelText="Scheme" name="scheme" /> */}
          <Selectdropdown options={options} selectText="Select Scheme"></Selectdropdown>
        </div>

        <div className={schemeStyle["form-group"]}>
          <div className={schemeStyle["invest_amount"]}>
            <p>Investment Amount</p>
            <Input variant="plain" name="scheme" />
          </div>
        </div>
        <div className={schemeStyle["form-group"]}>
          <div className={schemeStyle["invest_month"]}>
            <p>Tenure (Months) </p>
            <Input variant="plain" name="Month" />
          </div>
        </div>
        <div className={schemeStyle["form-group"]}>
          <CustomDatePicker
            selectedDate={selectedDate}
            onChange={handleDateChange}
            label="DD/MM/YYYY"
          />
        </div>

        <div className={schemeStyle["formFooter"]}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" path="/customer-info">Save</Button>

        </div>
      </div>
    </>
  );
}
