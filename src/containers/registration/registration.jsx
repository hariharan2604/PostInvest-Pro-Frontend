"use client"
import React from "react";
import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import styles from './registration.module.scss'
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import City from '../../app/_data/cities.json';
import State from '../../app/_data/states.json';
import Selectdropdown from "@/components/ui/select/select";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import IconInput from '@/components/ui/icon-input/icon-input';
import InfoModal from "@/components/ui/info-modal/info-modal";
import { validateForm } from "../../app/_utils/form-validator"; 

export default function Registration() {
    const router = useRouter();
    const pathname = usePathname()
    // const searchParams = useSearchParams()
    const [isModalOpen, setModalOpen] = useState(false);
    const [isError, setError] = useState(false);
    const [formData, setFormData] = useState({ gender: "Male" });
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState({});

    const handleCloseModal = () => {
        setModalOpen(false);
        if (!isError) {
            router.push("/");
        }
    }

    const handleDateChange = (date) => {
        setFormData((prevData) => ({
            ...prevData,
            dob: date
        }));
        // console.log(formData.dob);
    };



    const handleRadioChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            gender: event.target.value
        }));
    }

    const handleInputChange = (field) => (value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const submitData = async () => {
        try {
            const response = await fetch('/api/auth/register-agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.status === "success") {
                setError(false);
            }
            else if (result.status === "error") {
                setError(true);
            }
            setModalOpen(true);
            setResponse(result);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            submitData();
            console.log(formData);
        }
    }


    return (
        <div className="container">
            <div className={styles["register-container"]}>
                <div className={styles['register-details']}>
                    <div className={styles['register-form']}>
                        <Input labelText="Full Name" name="name" onChange={handleInputChange("name")} value={formData.name} errorText={errors.name} />
                        <Input labelText="Mobile No" name="mobile" onChange={handleInputChange("mobile")} value={formData.mobile} errorText={errors.mobile} />
                        <Input labelText="Email ID" name="email" onChange={handleInputChange("email")} value={formData.email} errorText={errors.email} />
                        <IconInput name="password" variant='eye' labelText='Password' onChange={handleInputChange("password")} errorText={errors.password} />
                        <IconInput name="confirm_password" variant='eye' labelText='Confirm Password' onChange={handleInputChange("confirm_password")} errorText={errors.confirm_password} />
                        <div className={styles["flex-class"]}>
                            <div className={styles["radioGroup"]}>
                                <div className={styles["flex-class"]}>Gender</div>
                                <RadioButton
                                    variant="radiobtns"
                                    id="Gender"
                                    name="gender"
                                    labeltext="Male"
                                    value="Male"
                                    checkedValue={formData.gender}
                                    onChange={handleRadioChange}
                                />
                                <RadioButton
                                    variant="radiobtns"
                                    id="Gender"
                                    name="gender"
                                    labeltext="Female"
                                    value="Female"
                                    checkedValue={formData.gender}
                                    onChange={handleRadioChange}
                                />
                            </div>
                        </div>
                        <CustomDatePicker
                            selectedDate={formData.dob}
                            onChange={handleDateChange}
                            label="Date of Birth (DD/MM/YYYY)"
                            placeholder="DD/MM/YYYY"
                            errorText={errors.dob}
                        />
                        <Input labelText="Address Line 1" name="address1" onChange={handleInputChange("address1")} value={formData.address1} errorText={errors.address1} />
                        <Input labelText="Address Line 2" name="address2" onChange={handleInputChange("address2")} value={formData.address2} />
                        <Input labelText="Area" name="area" value={formData.area} onChange={handleInputChange("area")} errorText={errors.area}/>
                        <Selectdropdown options={City} selectText="Select City" setSelectedOption={(value) => handleSelectChange("city", value)} selectedOption={formData.city} errorText={errors.city}></Selectdropdown>
                        <Selectdropdown options={State} selectText="Select State" setSelectedOption={(value) => handleSelectChange("state", value)} selectedOption={formData.state} errorText={errors.state}></Selectdropdown>
                        <Input labelText="Zip" name="zip" value={formData.zip} onChange={handleInputChange("zip")} errorText={errors.zip} />
                    </div>
                    <div className={styles["login-section"]}>
                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        <Button variant="outline" path='/'>Back to Login</Button>
                    </div>
                </div >
                <div className={styles.bottom}>
                    {isModalOpen && (
                        <div className={styles.overlay}>
                            <InfoModal errorStatus={isError} Title={isError ? "Error in Agent Registration" : "Registration Successful"} Content={isError ? response.error.message : "Login to Continue..."} onOpen={isModalOpen} onClose={handleCloseModal} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}