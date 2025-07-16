import { PAYMENT_METHODS } from "../../app/_data/paymentConstants";

export const rules = {
    paymentMethod: {
        required: true,
        requiredMessage: "Please select a payment method.",
    },
    chequeType: {
        required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
        requiredMessage: "Please select Cheque type.",
    },
    inputFields: [
        {
            receipt_amount: {
                required: true,
                pattern: /^\d+(\.\d{1,2})?$/,
                patternMessage: "Enter a valid amount.",
            },
            chq_number: {
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
                requiredMessage: "Cheque number is required.",
            },
            bank_id: {
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
                requiredMessage: "Bank is required.",
            },
            sb_acc_number: {
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
                requiredMessage: "Account number is required.",
            },
            instrument_class_id: {
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
                requiredMessage: "Select Cheque type.",
            },
            cheque_date: {
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CHEQUE,
                requiredMessage: "Cheque date is required.",
            },
        },
    ],
};
