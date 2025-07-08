export const validateForm = (formData, rules) => {
    const errors = {};

    for (const field in rules) {
        const value = formData[field];
        const ruleSet = rules[field];

        if (ruleSet.required && !value) {
            errors[field] = ruleSet.requiredMessage || `${field} is required.`;
            continue;
        }

        if (!value) continue;

        if (ruleSet.pattern && !ruleSet.pattern.test(value)) {
            errors[field] = ruleSet.patternMessage || `Invalid ${field} format.`;
        }

        if (ruleSet.validate && typeof ruleSet.validate === "function") {
            const error = ruleSet.validate(value, formData);
            if (error) errors[field] = error;
        }
    }

    return errors;
};
