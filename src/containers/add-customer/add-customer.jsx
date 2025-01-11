import customerStyle from "./add-customer.module.scss";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import IconInput from "@/components/ui/icon-input/icon-input";
import NavigateLinkComponent from "@/components/ui/navigator-link/navigator-link";
import Selectdropdown from "@/components/ui/select/select";
import InfoModal from "@/components/ui/info-modal/info-modal";
import { useState } from "react";
import styles from './add-customer.module.scss'
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";

export default function AddCustomer() {

  const State = [
    { value: "chennai", label: "chennai" },
    { value: "Kerala", label: "Kerala" },
    { value: "goa", label: "goa" },
  ];
  const [isVisible, isSetVisible] = useState(false)
  function setTimeOutModal() {
    isSetVisible(!isVisible)
    setTimeout(() => {
      isSetVisible(false)
    }, 2000);
  }
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log('Selected Date:', selectedDate)
  };

  return (
    <>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Full Name" name="full_name" />
      </div>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Mobile No" name="mobile" />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Email ID" name="email" />
      </div>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Gender" name="gender" />
      </div>
      <div className={customerStyle["form-group"]}>
        <CustomDatePicker
          selectedDate={selectedDate}
          onChange={handleDateChange}
          label="Date of Birth"
        />
      </div>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Address" name="address" />
      </div>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Area" name="area" />
      </div>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Zip" name="zip" />
      </div>
      <div className={customerStyle["form-group"]}>
        <Selectdropdown options={State} selectText="Select State"></Selectdropdown>
      </div>
      <div className={customerStyle["addMember"]}>
        <NavigateLinkComponent navigateLink="/family-members" iconPosition="left" navigateLabel="Add More Family Member" />

      </div>
      <div className={customerStyle["buttonGroup"]}>
        <Button variant="outline" path="/dashboard">Cancel</Button>
        <Button variant="primary" onClick={setTimeOutModal}>Save</Button>
      </div>
      <div className={styles.bottom}>
        {isVisible && (
          <div className={styles.overlay}>
            <InfoModal successTitle="Check details Updated" successContent="The customer's cheque has been collected by our agent." />
          </div>
        )}
      </div>


    </>
  );
}
