"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/button";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import InfoModal from "@/components/ui/info-modal/info-modal";
import { useTitle } from "@/contexts/TitleContext";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import { initialFormData as emptyForm } from "./formData";
import { rules } from "./rules";
import {
    PAYMENT_METHODS,
    INSTRUMENT_CLASSES,
} from "@/app/_data/paymentConstants";
import { useRouter } from "next/navigation";
import styles from "./collection-pending.module.scss";
import ChequeInputFields from "./ChequeInputFields";
import CashInputField from "./CashInputField";

export default function CollectionPending({ customer_id }) {
    const router = useRouter();
    const [banks, setBanks] = useState([]);
    const [chequeStatuses, setChequeStatuses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const { setTitle } = useTitle();

    const handleCloseModal = (shouldRedirect = false) => {
        shouldRedirect && router.back();
        setModalOpen(false);
    };

    const updateChqErrors = (index, newValue) => {
        setErrors(prev => {
            const inputFields = Array.isArray(prev.inputFields) ? [...prev.inputFields] : [];

            while (inputFields.length <= index) {
                inputFields.push({});
            }

            inputFields[index] = {
                ...inputFields[index],
                chq_number: newValue,
            };

            return {
                ...prev,
                inputFields,
            };
        });
    };


    const {
        formData,
        updateFormData,
        errors,
        handleRadioChange,
        handleSubmit,
        resetForm,
        setErrors,
    } = useFormHandler({
        initialFormData: emptyForm,
        validationRules: rules,
        apiEndpoint: "/api/receipt/add",
        onSuccess: (resData) => {
            if (resData.data.summary.failed > 0) {
                setIsError(parseInt(resData.data.summary.failed) > 0);

                const updatedStatuses = resData?.data?.responses?.map((entry) => {
                    const status = entry.success ? "success" : "failed";
                    if (status === "failed")
                        updateChqErrors(entry.index, entry?.error);
                    return { status };
                });

                setChequeStatuses(updatedStatuses);
            }
            else {
                setIsError(false);
            }
            setModalOpen(true);
        }
        ,
        onError: (err) => {
            setModalOpen(true);
        },
    });

    const isCheque = formData.paymentMethod === PAYMENT_METHODS.CHEQUE;
    const isCash = formData.paymentMethod === PAYMENT_METHODS.CASH;

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await fetch(`/api/bank/bank-data`);
                const { data } = await res.json();
                if (res.ok && data) {
                    const { bank_detail } = data;
                    setBanks(
                        bank_detail.map((item) => ({
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
        if (customer_id) {
            updateFormData({ customer_id });
        }
        setTitle("Receipt Collection");
    }, []);

    useEffect(() => {
        if (isCash) {
            updateFormData({
                inputFields: [
                    {
                        receipt_amount: "",
                        chq_number: "",
                        bank_id: "",
                        sb_acc_number: "",
                        instrument_class_id: "",
                        cheque_date: null,
                    },
                ],
            });
        } else if (isCheque) {
            const newField = {
                receipt_amount: "",
                chq_number: "",
                bank_id: "",
                sb_acc_number: "",
                instrument_class_id: INSTRUMENT_CLASSES.OTHERS,
                cheque_date: null,
            };

            updateFormData({
                inputFields:
                    formData.inputFields.length > 0
                        ? formData.inputFields.map((field) => ({
                            ...field,
                            instrument_class_id: INSTRUMENT_CLASSES.OTHERS,
                        }))
                        : [newField],
            });
        }
    }, [formData.paymentMethod]);

    const handleFieldChange = (index, field) => (value) => {
        const updated = [...formData.inputFields];
        updated[index][field] = value;
        updateFormData({ inputFields: updated });
    };

    const handleFieldDateChange = (index, date) => {
        const updated = [...formData.inputFields];
        updated[index].cheque_date = date;
        updateFormData({ inputFields: updated });
    };

    const handleSelectDropdownChange = (index, value) => {
        const updated = [...formData.inputFields];
        updated[index].bank_id = value;
        updateFormData({ inputFields: updated });
    };

    const handleInstrumentChange = (index, value) => {
        const updated = [...formData.inputFields];
        updated[index].instrument_class_id = value;
        updateFormData({ inputFields: updated });
    };

    const handleAddFields = () => {
        const newField = {
            receipt_amount: "",
            chq_number: "",
            bank_id: "",
            sb_acc_number: "",
            instrument_class_id: INSTRUMENT_CLASSES.OTHERS,
            cheque_date: null,
        };
        updateFormData({
            inputFields: [...formData.inputFields, newField],
        });
        setChequeStatuses([...chequeStatuses, null]);
    };

    const handleDeleteField = (index) => {
        const updated = formData.inputFields.filter((_, i) => i !== index);
        updateFormData({ inputFields: updated });
        const updatedStatuses = chequeStatuses.filter((_, i) => i !== index);
        setChequeStatuses(updatedStatuses);
    };

    const handleRetrySubmit = () => {
        setChequeStatuses([]);
        handleSubmit();
    };

    // const formData.inputFields = isCash
    //     ? formData.inputFields.slice(0, 1)
    //     : formData.inputFields;

    return (
        <>
            <div className={styles["form-group"]}>
                <div className={styles["flex-class"]}>
                    <div className={styles["radioGroup"]}>
                        <div className={styles["flex-class"]}>Receipt Type</div>
                        <RadioButton
                            variant="radiobtns"
                            id="Cheque"
                            name="paymentMethod"
                            labeltext="Cheque"
                            value={PAYMENT_METHODS.CHEQUE}
                            checkedValue={formData.paymentMethod}
                            onChange={handleRadioChange("paymentMethod")}
                        />
                        <RadioButton
                            variant="radiobtns"
                            id="Cash"
                            name="paymentMethod"
                            labeltext="Cash"
                            value={PAYMENT_METHODS.CASH}
                            checkedValue={formData.paymentMethod}
                            onChange={handleRadioChange("paymentMethod")}
                        />
                    </div>
                </div>
            </div>

            {isCheque && (
                <ChequeInputFields
                    inputFields={formData.inputFields}
                    errors={errors?.inputFields}
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
                    errors={errors?.inputFields}
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
                <Button variant="primary" onClick={handleRetrySubmit}>
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
                        {!isError && (<Button variant="primary" onClick={() => setModalOpen(false)}>
                            Add More {isCash ? "Cash" : "Cheques"} Receipts
                        </Button>)}
                    </InfoModal>
                </div>
            )}
        </>
    );
}
