export const rules = {
    name: {
        required: true,
        pattern: /^[a-zA-Z ]{2,30}$/,
        patternMessage: "Full name should contain only alphabets"
    },
    cif: {
        required: false,
        pattern: /^\d{9}$/,
        patternMessage: "Invalid cif"
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
    dob: {
        required: false,
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

