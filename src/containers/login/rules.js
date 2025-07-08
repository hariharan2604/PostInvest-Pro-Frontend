export const rules = {
    username: {
        required: true,
        pattern: /^\d{10}$/,
        patternMessage: "Invalid mobile number."
    },
    password: {
        required: true
    },
};
