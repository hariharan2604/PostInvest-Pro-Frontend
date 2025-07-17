"use client";
import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalHeader,
    ModalContent,
    ModalFooter,
} from "@/components/ui/modal/modal";
import Button from "@/components/ui/button/button";
import Input from "@/components/ui/input/input";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import Selectdropdown from "@/components/ui/select/select";
import { Accordion, AccordionItem } from "@/components/ui/accordion/accordion";
import Image from "next/image";
import TrashIcon from "@icons/trash.svg";

import styles from "./collection-pending.module.scss";

import { useFormHandler } from "@/app/_hooks/useFormHandler.js";
import { initialFormData as emptyForm } from "./formData.js";
import { rules } from "./rules";
import {
    PAYMENT_METHODS,
    INSTRUMENT_CLASSES,
} from "../../app/_data/paymentConstants";
import InfoModal from "@/components/ui/info-modal/info-modal";

export default function CollectionPendingModal({ isOpen, onClose, customer_id }) {
    const [banks, setBanks] = useState([]);
    const [failedIndexes, setFailedIndexes] = useState([]);
    const [successIndexes, setSuccessIndexes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
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
        onSuccess: (responseArray) => {

            console.log("🚀 ~ CollectionPendingModal ~ responseArray:", responseArray);

            const failed = [];
            const success = [];
            const updatedErrors = { inputFields: [] };

            responseArray.forEach((res, index) => {
                if (res.success) {
                    success.push(index);
                } else {
                    failed.push(index);
                    setIsError(true);
                    const message = res.data?.error?.message || "Unknown error";
                    const fieldErrors = {};

                    if (message.toLowerCase().includes("cheque number")) {
                        fieldErrors.chq_number = message;
                    } else {
                        fieldErrors.general = message;
                    }
                    updatedErrors.inputFields[index] = fieldErrors;
                }
            });

            setFailedIndexes(failed);
            setSuccessIndexes(success);

            if (success.length > 0 && formData.paymentMethod == PAYMENT_METHODS.CHEQUE) {
                const remainingFields = formData.inputFields.filter((_, i) => !success.includes(i));
                updateFormData({ inputFields: remainingFields });
            }

            setErrors(updatedErrors);
            setModalOpen(true);
        }
        ,
        onError: (err) => {
            console.error("Save failed", err);
            setModalOpen(true);
        },
    });

    const isCheque = formData.paymentMethod === PAYMENT_METHODS.CHEQUE;
    const isCash = formData.paymentMethod === PAYMENT_METHODS.CASH;
    const addmore = isCheque;

    useEffect(() => {
        if (!isOpen) return;

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
    }, [isOpen]);

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
    };

    const handleDeleteField = (index) => {
        const updated = formData.inputFields.filter((_, i) => i !== index);
        updateFormData({ inputFields: updated });
    };

    const filteredInputFields = isCash
        ? formData.inputFields.slice(0, 1)
        : formData.inputFields;

    return (
        <> <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader
                title="Collection Pending"
                subTitle="Please fill the cheque details"
                showButton={true}
                onClose={onClose}
            />
            <ModalContent>
                <div className={styles["flex-class"]}>
                    <div className={styles["radioGroup"]}>
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

                {isCheque &&
                    filteredInputFields.map((inputField, index) => (
                        <div
                            key={index}
                            className={`${styles["accordion-wrapper"]} 
        ${failedIndexes.includes(index) ? styles["failed-accordion"] : ""} 
        ${successIndexes.includes(index) ? styles["success-accordion"] : ""}
    `}
                        >

                            <Accordion>
                                <AccordionItem
                                    header={
                                        <div className={styles["accordion-header"]}>
                                            <span>Cheque #{index + 1}</span>
                                            {filteredInputFields.length > 1 && (
                                                <Image
                                                    className={styles["delete-btn"]}
                                                    src={TrashIcon}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteField(index);
                                                    }}
                                                    alt="Delete"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                        </div>
                                    }
                                >
                                    <div className={styles["border-top"]}>
                                        <div className={styles["form-group"]}>
                                            <Input
                                                labelText="Amount"
                                                name="receipt_amount"
                                                value={inputField.receipt_amount}
                                                onChange={handleFieldChange(index, "receipt_amount")}
                                                errorText={errors?.inputFields?.[index]?.receipt_amount}
                                            />
                                        </div>

                                        <div className={styles["form-group"]}>
                                            <Input
                                                labelText="CHQ Number"
                                                name="chq_number"
                                                value={inputField.chq_number}
                                                onChange={handleFieldChange(index, "chq_number")}
                                                errorText={errors?.inputFields?.[index]?.chq_number}
                                            />
                                        </div>

                                        <div className={styles["form-group"]}>
                                            <Selectdropdown
                                                options={banks}
                                                selectText="Select Bank"
                                                setSelectedOption={(value) =>
                                                    handleSelectDropdownChange(index, value)
                                                }
                                                selectedOption={inputField.bank_id}
                                                errorText={errors?.inputFields?.[index]?.bank_id}
                                            />
                                        </div>

                                        <div className={styles["form-group"]}>
                                            <Input
                                                labelText="Account Number"
                                                name="sb_acc_number"
                                                value={inputField.sb_acc_number}
                                                onChange={handleFieldChange(index, "sb_acc_number")}
                                                errorText={errors?.inputFields?.[index]?.sb_acc_number}
                                            />
                                        </div>

                                        <div className={styles["form-group"]}>
                                            <div className={styles["radioGroup"]}>
                                                <div className={styles["flex-class"]}>Cheque Type</div>
                                                <RadioButton
                                                    variant="radiobtns"
                                                    id={`dop-${index}`}
                                                    name={`instrument_class_id-${index}`}
                                                    labeltext="Dop"
                                                    value={INSTRUMENT_CLASSES.DOP}
                                                    checkedValue={inputField.instrument_class_id}
                                                    onChange={() =>
                                                        handleInstrumentChange(index, INSTRUMENT_CLASSES.DOP)
                                                    }
                                                />
                                                <RadioButton
                                                    variant="radiobtns"
                                                    id={`others-${index}`}
                                                    name={`instrument_class_id-${index}`}
                                                    labeltext="Others"
                                                    value={INSTRUMENT_CLASSES.OTHERS}
                                                    checkedValue={inputField.instrument_class_id}
                                                    onChange={() =>
                                                        handleInstrumentChange(index, INSTRUMENT_CLASSES.OTHERS)
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className={styles["form-group"]}>
                                            <CustomDatePicker
                                                selectedDate={inputField.cheque_date}
                                                onChange={(date) => handleFieldDateChange(index, date)}
                                                label="Cheque Date (DD/MM/YYYY)"
                                                placeholder="DD/MM/YYYY"
                                                errorText={errors?.inputFields?.[index]?.cheque_date}
                                            />
                                        </div>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    ))}

                {isCash &&
                    filteredInputFields.map((inputField, index) => (
                        <div key={index} className={styles["border-top"]}>
                            <div className={styles["form-group"]}>
                                <Input
                                    labelText="Amount"
                                    name="receipt_amount"
                                    value={inputField.receipt_amount}
                                    onChange={handleFieldChange(index, "receipt_amount")}
                                    errorText={errors?.inputFields?.[index]?.receipt_amount}
                                />
                            </div>
                        </div>
                    ))}

                {addmore && (
                    <Button variant="linkButton" onClick={handleAddFields} margintop="20px">
                        Add More
                    </Button>
                )}
            </ModalContent>

            <ModalFooter>
                <Button variant="outline" onClick={() => { onClose(); resetForm() }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
            <InfoModal
                errorStatus={isError}
                Title={isError ? "Error Adding Cheques" : "Receipts Added Successfully"}
                Content={isError ? "Error in Creating receipts" : "Receipts Addition Successfull"}
                onOpen={modalOpen}
                showButton={false}
            >
                <Button variant="outline" onClick={() => { onClose(); setModalOpen(false); resetForm() }}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                    Add More Cheque
                </Button>
            </InfoModal>
        </>
    );
}
