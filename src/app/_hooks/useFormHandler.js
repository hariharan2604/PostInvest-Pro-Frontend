import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { validateForm } from '../_utils/form-validator';

export const useFormHandler = ({
    initialFormData = {},
    validationRules = {},
    apiEndpoint = '',
    method = 'POST',
    redirectPath = '/',
    forwardPath = false,
    onSuccess = () => { },
    onError = () => { },
}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isError, setError] = useState(false);
    const [response, setResponse] = useState(null);

    const router = useRouter();

    const handleInputChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleRadioChange = (field) => (event) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleDateChange = (field, date) => {
        setFormData((prev) => ({ ...prev, [field]: date }));
    };

    const submitData = async () => {
        try {
            console.log("🚀 ~ submitData ~ formData:", formData);

            const res = await fetch(apiEndpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            setResponse(result);

            const isArrayResponse = Array.isArray(result);

            if (isArrayResponse) {
                const allSuccess = result.every((r) => r.success);
                setError(!allSuccess);
                if (allSuccess) {
                    onSuccess(result);
                    if (forwardPath) router.push(redirectPath);
                } else {
                    onSuccess(result);
                }
            }
            // Standard single-response case
            else {
                if (result.status === 'success') {
                    setError(false);
                    onSuccess(result);
                    if (forwardPath) router.push(redirectPath);
                } else {
                    setError(true);
                    onError(result);
                }
            }

        } catch (error) {
            setError(true);
            onError(error);
        }
    };

    const handleSubmit = (event) => {
        if (event?.preventDefault) event.preventDefault();

        const validationErrors = validateForm(formData, validationRules);


        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            submitData();
        }
    };

    const updateFormData = useCallback((updatedFields) => {
        setFormData((prev) => ({
            ...prev,
            ...updatedFields,
        }));
    }, []);
    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setError(false);
        setResponse(null);
    };
    return {
        formData,
        updateFormData,
        errors,
        setErrors,
        isError,
        response,
        setFormData,
        handleInputChange,
        handleSelectChange,
        handleRadioChange,
        handleDateChange,
        handleSubmit,
        resetForm
    };
};
