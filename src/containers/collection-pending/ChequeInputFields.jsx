"use client";
import React, { useEffect, useRef } from "react";
import Input from "@/components/ui/input/input";
import Selectdropdown from "@/components/ui/select/select";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import { Accordion, AccordionItem } from "@/components/ui/accordion/accordion";
import Image from "next/image";
import TrashIcon from "@icons/trash.svg";
import styles from "./collection-pending.module.scss";
import { INSTRUMENT_CLASSES } from "@/app/_data/paymentConstants";

export default function ChequeInputFields({
    inputFields,
    errors,
    banks,
    chequeStatuses = [],
    handleFieldChange,
    handleFieldDateChange,
    handleSelectDropdownChange,
    handleInstrumentChange,
    handleDeleteField,
}) {
    const accordionRefs = useRef([]);

    useEffect(() => {
        const firstErrorIndex = errors?.findIndex(
            (err) => err && Object.values(err).some(Boolean)
        );
        if (firstErrorIndex !== -1 && accordionRefs.current[firstErrorIndex]) {
            accordionRefs.current[firstErrorIndex].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [errors]);

    return inputFields.map((inputField, index) => {
        const status = chequeStatuses[index]?.status;

        return (
            <div
                key={index}
                ref={(el) => (accordionRefs.current[index] = el)}
                className={`${styles["accordion-wrapper"]}`}
            >
                <Accordion>
                    <AccordionItem
                        header={
                            <div className={styles["accordion-header"]}>
                                <span className={styles.chequeLabel}>
                                    Cheque #{index + 1}
                                    {status && (
                                        <div
                                            className={`${styles.dot} ${status === "success"
                                                    ? styles.success
                                                    : styles.error
                                                }`}
                                        />
                                    )}
                                </span>

                                {inputFields.length > 1 &&
                                    status !== "success" && (
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
                        <div className={styles["form-group"]}>
                            <div className={styles["radioGroup"]}>
                                <div className={styles["flex-class"]}>Type</div>
                                <RadioButton
                                    variant="radiobtns"
                                    id={`dop-${index}`}
                                    name={`instrument_class_id-${index}`}
                                    labeltext="DOP"
                                    value={INSTRUMENT_CLASSES.DOP}
                                    checkedValue={inputField.instrument_class_id}
                                    onChange={() =>
                                        handleInstrumentChange(
                                            index,
                                            INSTRUMENT_CLASSES.DOP
                                        )
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
                                        handleInstrumentChange(
                                            index,
                                            INSTRUMENT_CLASSES.OTHERS
                                        )
                                    }
                                />
                            </div>
                        </div>

                        <div className={styles["form-group"]}>
                            <Input
                                labelText="Amount"
                                name="receipt_amount"
                                value={inputField.receipt_amount}
                                onChange={handleFieldChange(index, "receipt_amount")}
                                errorText={errors?.[index]?.receipt_amount}
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <Input
                                labelText="CHQ Number"
                                name="chq_number"
                                value={inputField.chq_number}
                                onChange={handleFieldChange(index, "chq_number")}
                                errorText={errors?.[index]?.chq_number}
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
                                errorText={errors?.[index]?.bank_id}
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <Input
                                labelText="Account Number"
                                name="sb_acc_number"
                                value={inputField.sb_acc_number}
                                onChange={handleFieldChange(index, "sb_acc_number")}
                                errorText={errors?.[index]?.sb_acc_number}
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <CustomDatePicker
                                selectedDate={inputField.cheque_date}
                                onChange={(date) =>
                                    handleFieldDateChange(index, date)
                                }
                                label="Cheque Date (DD/MM/YYYY)"
                                placeholder="DD/MM/YYYY"
                                errorText={errors?.[index]?.cheque_date}
                            />
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    });
}
