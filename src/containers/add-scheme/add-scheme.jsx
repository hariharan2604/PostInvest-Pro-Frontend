"use client";
import schemeStyle from "./add-scheme.module.scss";
import style from "../add-family/add-family.module.scss";
import modal from "../add-customer/add-customer.module.scss";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import Selectdropdown from "@/components/ui/select/select";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import React, { useEffect, useState } from "react";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import { useTitle } from "@/contexts/TitleContext";
import { initialFormData as emptyForm } from "./formData.js";
import { rules } from "./rules.js";
import { useRouter, useSearchParams } from "next/navigation";
import InfoModal from "@/components/ui/info-modal/info-modal";

export default function AddScheme() {
  const searchParams = useSearchParams();
  const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [schemes, setSchemes] = useState([]);
  const { setTitle } = useTitle();
  const router = useRouter();

  const {
    formData,
    updateFormData,
    errors,
    isError,
    modalOpen,
    response,
    handleInputChange,
    handleSelectChange,
    handleDateChange,
    handleSubmit,
    handleCloseModal,
  } = useFormHandler({
    initialFormData: emptyForm,
    validationRules: rules,
    apiEndpoint: `/api/investment/add`,
    redirectPath: "/",
    method: "POST",
  });

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const res = await fetch(`/api/investment/scheme-data`);
        const { data } = await res.json();
        if (res.ok && data) {
          const { scheme_detail } = data;
          setSchemes(
            scheme_detail.map((item) => ({
              value: String(item.id),
              label: String(item.scheme_name),
            }))
          );
        }
      } catch (error) {
        console.error("❌ Failed to fetch scheme data", error);
      }
    };
    fetchSchemeDetails();
  }, []);

  useEffect(() => {
    setTitle("Add Investment");

    if (searchParams) {
      const id = searchParams.get("id") || "";
      const name = searchParams.get("customer_name") || "";
      setCustomerId(id);
      setCustomerName(name);
      updateFormData({ customer_id: id });
    }
  }, [searchParams, setTitle, updateFormData]);

  return (
    <>
      <div className={schemeStyle["schemeGroup"]}>
        <div className={schemeStyle["form-group"]}>
          <Input
            labelText="Customer Name"
            name="customer_name"
            variant="disabled"
            value={customerName}
          />
        </div>
        <div className={schemeStyle["form-group"]}>
          <Selectdropdown
            options={schemes}
            selectText="Select Scheme"
            setSelectedOption={(value) => handleSelectChange("scheme_id", value)}
            selectedOption={formData.scheme_id}
            errorText={errors.scheme_id}
          />
        </div>

        <div className={schemeStyle["form-group"]}>
          <Input
            labelText="Account Number"
            name="investment_acc_no"
            onChange={handleInputChange("investment_acc_no")}
            value={formData.investment_acc_no}
            errorText={errors.investment_acc_no}
          />
        </div>

        <div className={schemeStyle["form-group"]}>
          <Input
            labelText="Amount (₹)"
            name="investment_amount"
            onChange={handleInputChange("investment_amount")}
            value={formData.investment_amount}
            errorText={errors.investment_amount}
          />
        </div>

        <div className={schemeStyle["form-group"]}>
          <Input
            labelText="Tenure (Months)"
            name="tenure"
            onChange={handleInputChange("tenure")}
            value={formData.tenure}
            errorText={errors.tenure}
          />
        </div>

        <div className={schemeStyle["form-group"]}>
          <CustomDatePicker
            selectedDate={formData.investment_date}
            onChange={(date) => handleDateChange("investment_date", date)}
            label="Investment Date (DD/MM/YYYY)"
            placeholder="DD/MM/YYYY"
            errorText={errors.investment_date}
          />
        </div>

        <div className={style["buttonGroup"]}>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>

        <div className={modal.bottom}>
          {modalOpen && (
            <div className={modal.overlay}>
              <InfoModal
                errorStatus={isError}
                Title={
                  isError
                    ? "Error Adding Investment.."
                    : "Investment Added Successfully"
                }
                Content={
                  isError
                    ? response?.error?.message
                    : "Investment Details Updated.."
                }
                onOpen={modalOpen}
                onClose={() => handleCloseModal(!isError)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
