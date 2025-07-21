import { PAYMENT_METHODS } from "../../app/_data/paymentConstants";

export const rules = {
    paymentMethod: {
        required: true,
        requiredMessage: "Please select a payment method.",
    },
    customer_id: {
        required: true,
    },
    inputFields: [
        {
            receipt_amount: {
                pattern: /^\d+(\.\d{1,2})?$/,
                patternMessage: "Enter a valid amount.",
                required: (formData) => formData.paymentMethod === PAYMENT_METHODS.CASH,
                requiredMessage: "Receipt Amount is required.",
            },
            chq_number: {
                pattern: /^\d{6,10}$/,
                patternMessage: "Invalid cheque number.",
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
                validate: (value) =>
                    isNaN(Date.parse(value)) ? "Invalid Cheque Date." : null
            },
        },
    ],
};
