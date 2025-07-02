"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import customerStyle from "./add-customer.module.scss";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import NavigateLinkComponent from "@/components/ui/navigator-link/navigator-link";
import Selectdropdown from "@/components/ui/select/select";
import InfoModal from "@/components/ui/info-modal/info-modal";
import State from '../../app/_data/states.json';
import City from '../../app/_data/cities.json';
import styles from './add-customer.module.scss';
import radioStyles from '../registration/registration.module.scss';
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import { initialFormData as emptyForm } from "./formData";
import { rules } from './rules.js';

export default function AddCustomer() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");
  const isUpdateMode = Boolean(customerId);

  const [isFormReady, setIsFormReady] = useState(!isUpdateMode);

  const {
    formData,
    updateFormData,
    errors,
    isError,
    modalOpen,
    response,
    handleInputChange,
    handleSelectChange,
    handleRadioChange,
    handleDateChange,
    handleSubmit,
    handleCloseModal,
  } = useFormHandler({
    initialFormData: emptyForm,
    validationRules: rules,
    apiEndpoint: isUpdateMode
      ? `/api/customer/update-customer/${customerId}`
      : "/api/customer/create-customer",
    redirectPath: "/",
    method: isUpdateMode ? "PUT" : "POST",
  });

  // Fetch data if editing
  useEffect(() => {
    if (!isUpdateMode) return;

    const fetchCustomerData = async () => {
      try {
        const res = await fetch(`/api/customer/get-customer-detail/${customerId}`);
        const { data } = await res.json();

        if (res.ok && data) {
          const {
            Investments,
            relatedCustomers,
            city,
            state,
            ...rest
          } = data;

          const cleaned = {
            ...rest,
            city: { value: city, label: city },
            state: { value: state, label: state },
          };

          console.log("✅ Cleaned customer data:", cleaned);
          updateFormData(cleaned);
          setIsFormReady(true);
        }
      } catch (error) {
        console.error("❌ Failed to fetch customer", error);
      }
    };

    fetchCustomerData();
  }, [customerId, isUpdateMode]);

  if (!isFormReady) return <div>Loading customer data...</div>;

  return (
    <>
      <div className={customerStyle["form-group"]}>
        <Input labelText="Full Name" name="name" onChange={handleInputChange("name")} value={formData.name} errorText={errors.name} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Cif" name="cif" onChange={handleInputChange("cif")} value={formData.cif} errorText={errors.cif} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Mobile No" name="mobile" onChange={handleInputChange("mobile")} value={formData.mobile} errorText={errors.mobile} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Email ID" name="email" onChange={handleInputChange("email")} value={formData.email} errorText={errors.email} />
      </div>

      <div className={customerStyle["form-group"]}>
        <div className={radioStyles["flex-class"]}>
          <div className={radioStyles["radioGroup"]}>
            <div className={radioStyles["flex-class"]}>Gender</div>
            <RadioButton
              variant="radiobtns"
              id="Gender"
              name="gender"
              labeltext="Male"
              value="Male"
              checkedValue={formData.gender}
              onChange={handleRadioChange}
            />
            <RadioButton
              variant="radiobtns"
              id="Gender"
              name="gender"
              labeltext="Female"
              value="Female"
              checkedValue={formData.gender}
              onChange={handleRadioChange}
            />
          </div>
        </div>
      </div>

      <div className={customerStyle["form-group"]}>
        <CustomDatePicker
          selectedDate={formData.dob}
          onChange={handleDateChange}
          label="Date of Birth (DD/MM/YYYY)"
          placeholder="DD/MM/YYYY"
          errorText={errors.dob}
        />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Address Line 1" name="address1" onChange={handleInputChange("address1")} value={formData.address1} errorText={errors.address1} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Address Line 2" name="address2" onChange={handleInputChange("address2")} value={formData.address2} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Area" name="area" value={formData.area} onChange={handleInputChange("area")} errorText={errors.area} />
      </div>

      <div className={customerStyle["form-group"]}>
        <Selectdropdown
          options={City}
          selectText="Select City"
          setSelectedOption={(value) => handleSelectChange("city", value)}
          selectedOption={formData.city}
          errorText={errors.city}
        />
      </div>

      <div className={customerStyle["form-group"]}>
        <Selectdropdown
          options={State}
          selectText="Select State"
          setSelectedOption={(value) => handleSelectChange("state", value)}
          selectedOption={formData.state}
          errorText={errors.state}
        />
      </div>

      <div className={customerStyle["form-group"]}>
        <Input labelText="Zip" name="zip" value={formData.zip} onChange={handleInputChange("zip")} errorText={errors.zip} />
      </div>

      <div className={customerStyle["addMember"]}>
        <NavigateLinkComponent navigateLink="/family-members" iconPosition="left" navigateLabel="Add More Family Member" />
      </div>

      <div className={customerStyle["buttonGroup"]}>
        <Button variant="outline" path="/dashboard">Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>{isUpdateMode ? 'Update' : 'Save'}</Button>
      </div>

      <div className={styles.bottom}>
        {modalOpen && (
          <div className={styles.overlay}>
            <InfoModal
              errorStatus={isError}
              Title={isError ? (isUpdateMode ? "Error Updating Customer" : "Error Creating Customer") : (isUpdateMode ? "Update Successful" : "Registration Successful")}
              Content={isError ? response?.error?.message : "Login to Continue..."}
              onOpen={modalOpen}
              onClose={handleCloseModal}
            />
          </div>
        )}
      </div>
    </>
  );
}
