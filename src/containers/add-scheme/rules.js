export const rules = {
    customer_id: {
        required: true,
    },
    scheme_id: {
        required: true,
    },
    status_id: {
        required: true,
    },
    investment_acc_no: {
        required: true,
        pattern: /^\d+$/,
        patternMessage: "Invalid Account number"
    },
    investment_amount: {
        required: true,
        pattern: /^\d+$/,
        patternMessage: "Invalid Amount"
    },
    tenure: {
        required: true,
        pattern: /^\d{1,3}$/,
        patternMessage: "Invalid Tenure"
    },
    investment_date: {
        required: true,
        validate: (value) =>
            isNaN(Date.parse(value)) ? "Invalid Date of Birth." : null
    },
};

