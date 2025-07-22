"use client"
import React, { useEffect, useState } from "react";
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
import { fetchWithAuth } from "@/app/_utils/fetchWithAuth";
import { createRefMap } from "@/app/_utils/createRefMap";
import { scrollToFirstError } from "@/app/_utils/scrollToFirstError";

export default function AddFamily() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const customer_name = searchParams.get("customer_name");
  const id = searchParams.get("id");
  const { setTitle } = useTitle();
  const [modalOpen, setModalOpen] = useState(false);

  const refMap = createRefMap(emptyForm);
  const handleCloseModal = (shouldRedirect = false) => {
    shouldRedirect && router.back();
    setModalOpen(false);
  };

  const {
    formData,
    updateFormData,
    errors,
    isError,
    response,
    handleInputChange,
    handleSelectChange,
    handleRadioChange,
    handleDateChange,
    handleSubmit,
  } = useFormHandler({
    initialFormData: emptyForm,
    validationRules: rules,
    apiEndpoint: `/api/customer/add-relation`,
    redirectPath: "/",
    method: "POST",
    onSuccess: (result) => {
      setModalOpen(true);
    },
    onError: (result) => {
      setModalOpen(true);
    }
  });
  useEffect(() => {
    if (id) {
      updateFormData({ id });
    }
  }, [id, updateFormData]);

  useEffect(() => {
    setTitle("Add Family Member");
  })

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      scrollToFirstError(errors, refMap);
    }
  }, [errors,refMap]);

  const fetchCustomerData = async (data) => {
    const customerId = data.id;

    try {
      const res = await fetchWithAuth(`/api/customer/get-customer-detail/${customerId}`);
      if (!res) return;
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

        updateFormData({ ...cleaned, relation_id: id });

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
        <Input ref={refMap.name} labelText="Full Name" name="name" onChange={handleInputChange("name")} value={formData.name} errorText={errors.name} />
      </div>
      <div className={style["form-group"]}>
        <Input ref={refMap.cif} labelText="Cif" name="cif" onChange={handleInputChange("cif")} value={formData.cif} errorText={errors.cif} />
      </div>
      <div className={style["form-group"]}>
        <Input ref={refMap.relationship} labelText="Relationship" name="relationship" onChange={handleInputChange("relationship")} value={formData.relationship} errorText={errors.relationship} />
      </div>
      <div className={style["form-group"]}>
        <Input ref={refMap.mobile} labelText="Mobile No" name="mobile" onChange={handleInputChange("mobile")} value={formData.mobile} errorText={errors.mobile} />
      </div>

      <div className={style["form-group"]}>
        <Input ref={refMap.email} labelText="Email ID" name="email" onChange={handleInputChange("email")} value={formData.email} errorText={errors.email} />
      </div>

      <div className={style["form-group"]}>
        <div className={radiostyle["flex-class"]}>
          <div className={radiostyle["radioGroup"]}>
            <div className={radiostyle["flex-class"]}>Gender</div>
            <RadioButton
              variant="radiobtns"
              id="Male"
              name="gender"
              labeltext="Male"
              value="Male"
              checkedValue={formData.gender}
              onChange={handleRadioChange('gender')}
            />
            <RadioButton
              variant="radiobtns"
              id="Female"
              name="gender"
              labeltext="Female"
              value="Female"
              checkedValue={formData.gender}
              onChange={handleRadioChange('gender')}
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
          ref={refMap.dob}
        />
      </div>

      <div className={style["form-group"]}>
        <Input ref={refMap.address1} labelText="Address Line 1" name="address1" onChange={handleInputChange("address1")} value={formData.address1} errorText={errors.address1} />
      </div>

      <div className={style["form-group"]}>
        <Input ref={refMap.address2} labelText="Address Line 2" name="address2" onChange={handleInputChange("address2")} value={formData.address2} />
      </div>

      <div className={style["form-group"]}>
        <Input ref={refMap.area} labelText="Area" name="area" value={formData.area} onChange={handleInputChange("area")} errorText={errors.area} />
      </div>

      <div className={style["form-group"]}>
        <Selectdropdown
          id={"city"}
          options={City}
          selectText="Select City"
          setSelectedOption={(value) => handleSelectChange("city", value)}
          selectedOption={formData.city}
          errorText={errors.city}
          ref={refMap.city}
        />
      </div>

      <div className={style["form-group"]}>
        <Selectdropdown
          id={"state"}
          options={State}
          selectText="Select State"
          setSelectedOption={(value) => handleSelectChange("state", value)}
          selectedOption={formData.state}
          errorText={errors.state}
          ref={refMap.state}
        />
      </div>

      <div className={style["form-group"]}>
        <Input ref={refMap.zip} labelText="Zip" name="zip" value={formData.zip} onChange={handleInputChange("zip")} errorText={errors.zip} />
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
