export const validateForm = (formData, rules) => {
    const errors = {};

    for (const field in rules) {
        const ruleSet = rules[field];
        const value = formData[field];

        if (Array.isArray(ruleSet)) {
            // inputFields array validation
            const arrayData = formData[field] || [];
            const arrayErrors = [];

            arrayData.forEach((item, index) => {
                const itemErrors = {};
                const currentRules = ruleSet[0];

                for (const key in currentRules) {
                    const rule = currentRules[key];
                    const ruleValue = typeof rule.required === "function"
                        ? rule.required(formData)
                        : rule.required;

                    if (ruleValue && !item[key]) {
                        itemErrors[key] = rule.requiredMessage || `${key} is required`;
                        continue;
                    }

                    if (item[key] && rule.pattern && !rule.pattern.test(item[key])) {
                        itemErrors[key] = rule.patternMessage || `Invalid ${key} format`;
                    }

                    if (item[key] && typeof rule.validate === "function") {
                        const error = rule.validate(item[key], formData);
                        if (error) itemErrors[key] = error;
                    }
                }

                arrayErrors[index] = itemErrors;
            });

            // only include if any item has error
            const hasAnyErrors = arrayErrors.some((errObj) => Object.keys(errObj).length > 0);
            if (hasAnyErrors) {
                errors[field] = arrayErrors;
            }
        } else {
            // flat fields
            const requiredCheck = typeof ruleSet.required === "function"
                ? ruleSet.required(formData)
                : ruleSet.required;

            if (requiredCheck && !value) {
                errors[field] = ruleSet.requiredMessage || `${field} is required`;
                continue;
            }

            if (value && ruleSet.pattern && !ruleSet.pattern.test(value)) {
                errors[field] = ruleSet.patternMessage || `Invalid ${field}`;
            }

            if (value && typeof ruleSet.validate === "function") {
                const err = ruleSet.validate(value, formData);
                if (err) errors[field] = err;
            }
        }
    }

    return errors;
};
