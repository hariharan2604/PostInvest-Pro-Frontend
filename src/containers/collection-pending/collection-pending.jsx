"use client";
import React, { useEffect, useState, useCallback } from "react";
import Button from "@/components/ui/button/button";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import InfoModal from "@/components/ui/info-modal/info-modal";
import Input from "@/components/ui/input/input";
import { useTitle } from "@/contexts/TitleContext";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import { initialFormData as emptyForm } from "./formData";
import { rules } from "./rules";
import {
    PAYMENT_METHODS,
    INSTRUMENT_CLASSES,
} from "@/app/_data/paymentConstants";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./collection-pending.module.scss";
import ChequeInputFields from "./ChequeInputFields";
import CashInputField from "./CashInputField";
import { fetchWithAuth } from "@/app/_utils/fetchWithAuth";

const createEmptyChequeField = () => ({
    receipt_amount: "",
    chq_number: "",
    bank_id: "",
    sb_acc_number: "",
    instrument_class_id: INSTRUMENT_CLASSES.OTHERS,
    cheque_date: null,
});

export default function CollectionPending() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [banks, setBanks] = useState([]);
    const [chequeStatuses, setChequeStatuses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    // const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const { setTitle } = useTitle();

    const {
        formData,
        updateFormData,
        errors,
        handleRadioChange,
        handleSubmit,
        setErrors,
    } = useFormHandler({
        initialFormData: emptyForm,
        validationRules: rules,
        apiEndpoint: "/api/receipt/add",
        onSuccess: (resData) => {
            const { responses = [], summary = {} } = resData?.data || {};
            if (!Array.isArray(responses)) return setIsError(true);

            const updatedStatuses = responses.map(entry => {
                const status = entry.success ? "success" : "failed";
                if (!entry.success) updateChqErrors(entry.index, entry?.error);
                return { status };
            });

            setChequeStatuses(updatedStatuses);
            setIsError(summary.failed > 0);
            setModalOpen(true);

            if (summary.failed === 0) {
                setChequeStatuses([]);
                updateFormData({
                    customer_id: formData.customer_id,
                    paymentMethod: formData.paymentMethod,
                    inputFields: [createEmptyChequeField()],
                });
            }
        },
        onError: () => setModalOpen(true),
    });

    const updateChqErrors = useCallback((index, newValue) => {
        setErrors(prev => {
            const inputFields = Array.isArray(prev.inputFields) ? [...prev.inputFields] : [];
            while (inputFields.length <= index) inputFields.push({});
            inputFields[index] = {
                ...inputFields[index],
                chq_number: newValue,
            };
            return { ...prev, inputFields };
        });
    }, [setErrors]);

    const isCheque = formData.paymentMethod === PAYMENT_METHODS.CHEQUE;
    const isCash = formData.paymentMethod === PAYMENT_METHODS.CASH;

    useEffect(() => {
        setTitle("Receipt Collection");

        if (searchParams) {
            const id = searchParams.get("id") || "";
            const name = searchParams.get("customer_name") || "";
            // setCustomerId(id);
            setCustomerName(name);
            updateFormData({ customer_id: id });
        }
    }, [searchParams, setTitle, updateFormData]);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await fetchWithAuth(`/api/bank/bank-data`);
                if (!res) return;
                const { data } = await res.json();
                if (res.ok && data) {
                    const { bank_detail } = data;
                    setBanks(
                        bank_detail.map(item => ({
                            value: String(item.id),
                            label: `${item.bank_name} (${item.code})`,
                        }))
                    );
                }
            } catch (error) {
                console.error("❌ Failed to fetch bank data", error);
            }
        };
        fetchBanks();
    }, []);

    useEffect(() => {
        if (formData.paymentMethod === PAYMENT_METHODS.CASH) {
            updateFormData({
                // ...formData,
                inputFields: [{ receipt_amount: "" }],
            });
        }

        if (formData.paymentMethod === PAYMENT_METHODS.CHEQUE) {
            updateFormData({
                // ...formData,
                inputFields: [createEmptyChequeField()],
            });
        }
        setErrors({});
        setChequeStatuses([]);

    }, [formData.paymentMethod, setErrors, updateFormData]);

    const handleFieldChange = useCallback((index, field) => (value) => {
        const updated = [...formData.inputFields];
        updated[index][field] = value;
        updateFormData({ inputFields: updated });
    }, [formData.inputFields, updateFormData]);

    const handleFieldDateChange = useCallback((index, date) => {
        const updated = [...formData.inputFields];
        updated[index].cheque_date = date;
        updateFormData({ inputFields: updated });
    }, [formData.inputFields, updateFormData]);

    const handleSelectDropdownChange = useCallback((index, value) => {
        const updated = [...formData.inputFields];
        updated[index].bank_id = value;
        updateFormData({ inputFields: updated });
    }, [formData.inputFields, updateFormData]);

    const handleInstrumentChange = useCallback((index, value) => {
        const updated = [...formData.inputFields];
        updated[index].instrument_class_id = value;
        updateFormData({ inputFields: updated });
    }, [formData.inputFields, updateFormData]);

    const handleAddFields = () => {
        updateFormData({
            inputFields: [...formData.inputFields, createEmptyChequeField()],
        });
        setChequeStatuses([...chequeStatuses, null]);
    };

    const handleDeleteField = (index) => {
        const updatedFields = formData.inputFields.filter((_, i) => i !== index);
        updateFormData({ inputFields: updatedFields });

        const updatedStatuses = chequeStatuses.filter((_, i) => i !== index);
        setChequeStatuses(updatedStatuses);
    };

    const handleSubmitClick = () => {
        if (formData.paymentMethod === PAYMENT_METHODS.CASH) {
            handleSubmit();
            return;
        }
        if (chequeStatuses.length === 0) {
            handleSubmit();
            return;
        }

        const failedIndices = chequeStatuses
            .map((status, i) => (status?.status === "failed" ? i : null))
            .filter(i => i !== null);

        if (failedIndices.length === 0) return;

        const filteredFields = formData.inputFields.filter((_, i) =>
            failedIndices.includes(i)
        );

        updateFormData({ inputFields: filteredFields });
        setChequeStatuses([]);
        setErrors({ inputFields: [] });
        handleSubmit();
    };

    const handleCloseModal = (shouldRedirect = false) => {
        if (shouldRedirect) router.back();
        setModalOpen(false);
    };

    return (
        <>
            <div className={styles["form-group"]}>
                <Input
                    labelText="Customer Name"
                    name="customer_name"
                    variant="disabled"
                    value={customerName}
                />
            </div>
            <div className={styles["form-group"]}>
                <div className={styles["flex-class"]}>
                    <div className={styles["radioGroup"]}>
                        <div className={styles["flex-class"]}>Receipt Type</div>
                        <RadioButton
                            variant="radiobtns"
                            id="Cash"
                            name="paymentMethod"
                            labeltext="Cash"
                            value={PAYMENT_METHODS.CASH}
                            checkedValue={formData.paymentMethod}
                            onChange={handleRadioChange("paymentMethod")}
                        />
                        <RadioButton
                            variant="radiobtns"
                            id="Cheque"
                            name="paymentMethod"
                            labeltext="Cheque"
                            value={PAYMENT_METHODS.CHEQUE}
                            checkedValue={formData.paymentMethod}
                            onChange={handleRadioChange("paymentMethod")}
                        />
                    </div>
                </div>
            </div>

            {isCheque && (
                <ChequeInputFields
                    inputFields={formData.inputFields}
                    errors={errors?.inputFields ?? []}
                    banks={banks}
                    chequeStatuses={chequeStatuses}
                    handleFieldChange={handleFieldChange}
                    handleFieldDateChange={handleFieldDateChange}
                    handleSelectDropdownChange={handleSelectDropdownChange}
                    handleInstrumentChange={handleInstrumentChange}
                    handleDeleteField={handleDeleteField}
                />
            )}

            {isCash && (
                <CashInputField
                    inputFields={formData.inputFields}
                    errors={errors?.inputFields ?? []}
                    handleFieldChange={handleFieldChange}
                />
            )}

            {isCheque && (
                <Button variant="linkButton" onClick={handleAddFields}>
                    Add More
                </Button>
            )}

            <div className={styles["buttonGroup"]}>
                <Button variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmitClick}>
                    Save
                </Button>
            </div>

            {modalOpen && (
                <div className={styles.bottom}>
                    <InfoModal
                        errorStatus={isError}
                        Title={
                            isError
                                ? "Error Adding Receipts"
                                : "Receipts Added Successfully"
                        }
                        Content={
                            isError
                                ? "Cheque submission failed. Recheck the entries"
                                : "All receipts added successfully."
                        }
                        onOpen={modalOpen}
                        showButton={true}
                        onClose={() => handleCloseModal(!isError)}
                    >
                        {!isError && (
                            <Button
                                variant="primary"
                                onClick={() => setModalOpen(false)}
                            >
                                Add More {isCash ? "Cash" : "Cheques"} Receipts
                            </Button>
                        )}
                    </InfoModal>
                </div>
            )}
        </>
    );
}
