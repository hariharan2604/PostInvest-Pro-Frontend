export const rules = {
    name: {
        required: true,
        pattern: /^[a-zA-Z ]{2,30}$/,
        patternMessage: "Full name should contain only alphabets"
    },
    mobile: {
        required: true,
        pattern: /^\d{10}$/,
        patternMessage: "Invalid mobile number."
    },
    email: {
        required: true,
        pattern: /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
        patternMessage: "Invalid email format."
    },
    password: {
        required: true
    },
    confirm_password: {
        required: true,
        validate: (value, formData) =>
            value !== formData.password ? "Passwords do not match." : null
    },
    dob: {
        required: true,
        validate: (value) =>
            isNaN(Date.parse(value)) ? "Invalid Date of Birth." : null
    },
    address1: {
        required: true
    },
    area: {
        required: true
    },
    city: {
        required: true
    },
    state: {
        required: true
    },
    zip: {
        required: true,
        pattern: /^\d{6}$/,
        patternMessage: "Invalid zip code."
    }
};
