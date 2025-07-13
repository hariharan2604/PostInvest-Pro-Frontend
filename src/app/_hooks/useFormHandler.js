import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { validateForm } from '../_utils/form-validator';

export const useFormHandler = ({
    initialFormData = {},
    validationRules = {},
    apiEndpoint = '',
    method = 'POST',
    redirectPath = '/',
    redirect = false,
    onSuccess = () => { },
    onError = () => { }
}) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isError, setError] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const router = useRouter();

    const handleCloseModal = (redirect = false) => {
        redirect && router.back();
        setModalOpen(false);
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

    const handleDateChange = (field, date) => {
        setFormData(prev => ({ ...prev, [field]: date }));
    };

    const submitData = async () => {
        try {
            const res = await fetch(apiEndpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            setResponse(result);

            if (result.status === 'success') {
                setError(false);
                onSuccess(result);
                redirect && router.push(redirectPath);
                console.log("🚀 ~ submitData ~ redirectPath:", redirectPath);

            } else {
                setError(true);
                onError(result);
            }



            setModalOpen(true);
        } catch (error) {
            setError(true);
            onError(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(formData, validationRules);
        setErrors(validationErrors);
        console.log("🚀 ~ handleSubmit ~ validationErrors:", validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            submitData();
        }
    };




    // const updateFormData = (newData) => {
    //     setFormData(prev => ({ ...prev, ...newData }));
    // };
    const updateFormData = useCallback((updatedFields) => {
        setFormData(prev => ({
            ...prev,
            ...updatedFields
        }));
    }, []);


    return {
        formData,
        updateFormData,
        errors,
        setErrors,
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
