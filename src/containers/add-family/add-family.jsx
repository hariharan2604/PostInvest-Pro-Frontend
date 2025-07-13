"use client"
import React, { useEffect } from "react";
import style from "./add-family.module.scss";
import modal from "../add-customer/add-customer.module.scss"
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import Selectdropdown from "@/components/ui/select/select";
import radiostyle from '../registration/registration.module.scss';
import InfoModal from "@/components/ui/info-modal/info-modal";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import State from '../../app/_data/states.json';
import City from '../../app/_data/cities.json';
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import SearchHead from "../search-header/search-header";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import { initialFormData as emptyForm } from "./formData.js";
import { rules } from "./rules.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useTitle } from "@/contexts/TitleContext";

export default function AddFamily() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_name = searchParams.get("customer_name");
  const id = searchParams.get("id");
  const { setTitle } = useTitle();
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
    apiEndpoint: `/api/customer/add-relation`,
    redirectPath: "/",
    method: "POST",
  });
  useEffect(() => {
    if (id) {
      updateFormData({ id });
    }
  }, [id]);

  useEffect(() => {
    setTitle("Add Family Member");
  })

  const fetchCustomerData = async (data) => {
    const customerId = data.id;

    try {
      const res = await fetch(`/api/customer/get-customer-detail/${customerId}`);
      const { data } = await res.json();

      if (res.ok && data) {
        const {
          Investments,
          relatedCustomers,
          city,
          state,
          id,
          ...rest
        } = data;

        const cleaned = {
          ...rest,
          city: { value: city, label: city },
          state: { value: state, label: state },
        };

        updateFormData(cleaned);
        updateFormData({ relation_id: id });
      }


    } catch (error) {
      console.error("❌ Failed to fetch customer", error);
    }
  };

  return (
    <>
      <div className={style["form-group"]}>
        <Input labelText="Customer Name" name="customer_name" variant="disabled" value={customer_name} />
      </div>
      <div className={style["form-group"]}>
        <SearchHead showRouteOptions={false} enableAdd={false} enableDropdown={true} onSelectResponse={fetchCustomerData} redirect={false}></SearchHead>
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Full Name" name="name" onChange={handleInputChange("name")} value={formData.name} errorText={errors.name} />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Cif" name="cif" onChange={handleInputChange("cif")} value={formData.cif} errorText={errors.cif} />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Relationship" name="relationship" onChange={handleInputChange("relationship")} value={formData.relationship} errorText={errors.relationship} />
      </div>
      <div className={style["form-group"]}>
        <Input labelText="Mobile No" name="mobile" onChange={handleInputChange("mobile")} value={formData.mobile} errorText={errors.mobile} />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Email ID" name="email" onChange={handleInputChange("email")} value={formData.email} errorText={errors.email} />
      </div>

      <div className={style["form-group"]}>
        <div className={radiostyle["flex-class"]}>
          <div className={radiostyle["radioGroup"]}>
            <div className={radiostyle["flex-class"]}>Gender</div>
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

      <div className={style["form-group"]}>
        <CustomDatePicker
          selectedDate={formData.dob}
          onChange={(date) => handleDateChange('dob', date)}
          label="Date of Birth (DD/MM/YYYY)"
          placeholder="DD/MM/YYYY"
          errorText={errors.dob}
        />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Address Line 1" name="address1" onChange={handleInputChange("address1")} value={formData.address1} errorText={errors.address1} />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Address Line 2" name="address2" onChange={handleInputChange("address2")} value={formData.address2} />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Area" name="area" value={formData.area} onChange={handleInputChange("area")} errorText={errors.area} />
      </div>

      <div className={style["form-group"]}>
        <Selectdropdown
          options={City}
          selectText="Select City"
          setSelectedOption={(value) => handleSelectChange("city", value)}
          selectedOption={formData.city}
          errorText={errors.city}
        />
      </div>

      <div className={style["form-group"]}>
        <Selectdropdown
          options={State}
          selectText="Select State"
          setSelectedOption={(value) => handleSelectChange("state", value)}
          selectedOption={formData.state}
          errorText={errors.state}
        />
      </div>

      <div className={style["form-group"]}>
        <Input labelText="Zip" name="zip" value={formData.zip} onChange={handleInputChange("zip")} errorText={errors.zip} />
      </div>

      <div className={style["buttonGroup"]}>
        <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save</Button>
      </div>

      <div className={modal.bottom}>
        {modalOpen && (
          <div className={modal.overlay}>
            <InfoModal
              errorStatus={isError}
              Title={isError ? "Error Updation Relation.." : "Customer Relation Updated"}
              Content={isError ? response?.error?.message : "The Customer Relation Details Updated.."}
              onOpen={modalOpen}
              onClose={() => handleCloseModal(!isError)}
            />
          </div>
        )}
      </div>
    </>
  );
}
