import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateForm } from '../_utils/form-validator';

export const useFormHandler = ({
    initialFormData = {},
    validationRules = {},
    apiEndpoint = '',
    redirectPath = '/',
    onSuccess = () => { },
    onError = () => { }
}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isError, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const router = useRouter();

    const handleCloseModal = () => {
        setModalOpen(false);
        if (!isError) {
            router.push(redirectPath);
        }
    };

    const handleInputChange = (field) => (value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRadioChange = (event) => {
        setFormData(prev => ({ ...prev, gender: event.target.value }));
    };

    const handleDateChange = (date) => {
        setFormData(prev => ({ ...prev, dob: date }));
    };

    const submitData = async () => {
        try {
            const res = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            setResponse(result);

            if (result.status === 'success') {
                setError(false);
                onSuccess(result);
            } else {
                setError(true);
                onError(result);
            }

            setModalOpen(true);
        } catch (error) {
            console.error("Submission error:", error);
            setError(true);
            onError(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(formData, validationRules);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            submitData();
        }
    };

    return {
        formData,
        errors,
        isError,
        modalOpen,
        response,
        setFormData,
        setModalOpen,
        handleCloseModal,
        handleInputChange,
        handleSelectChange,
        handleRadioChange,
        handleDateChange,
        handleSubmit,
    };
};
