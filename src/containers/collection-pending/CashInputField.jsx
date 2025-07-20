"use client";
import React from "react";
import Input from "@/components/ui/input/input";
import styles from "./collection-pending.module.scss";

export default function CashInputField({ inputFields, errors, handleFieldChange }) {
    return inputFields.map((inputField, index) => (
        <div key={index} className={styles["form-group"]}>
            <Input
                labelText="Amount"
                name="receipt_amount"
                value={inputField.receipt_amount}
                onChange={handleFieldChange(index, "receipt_amount")}
                errorText={errors?.[index]?.receipt_amount}
            />
        </div>
    ));
}
