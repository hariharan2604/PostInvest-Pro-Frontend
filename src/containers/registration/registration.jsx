"use client"
import React, { useEffect, useState } from "react";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";
import styles from './registration.module.scss';
import CustomDatePicker from "@/components/ui/CustomDatePicker/CustomDatePicker";
import City from '../../app/_data/cities.json';
import State from '../../app/_data/states.json';
import Selectdropdown from "@/components/ui/select/select";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import PasswordInput from '@/components/ui/icon-input/icon-input';
import InfoModal from "@/components/ui/info-modal/info-modal";
import { initialFormData } from './formData.js';
import { rules } from './rules.js';
import { useTitle } from "@/contexts/TitleContext";
import { createRefMap } from "@/app/_utils/createRefMap";
import { scrollToFirstError } from "@/app/_utils/scrollToFirstError";
import { useRouter } from "next/navigation";

export default function Registration() {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = (shouldRedirect = false) => {
        shouldRedirect && router.back();
        setModalOpen(false);
    };
    const refMap = createRefMap(initialFormData);

    const {
        formData,
        errors,
        isError,
        response,
        handleInputChange,
        handleSelectChange,
        handleRadioChange,
        handleDateChange,
        handleSubmit,
    } = useFormHandler({
        initialFormData,
        validationRules: rules,
        apiEndpoint: '/api/auth/register-agent',
        redirectPath: '/',
        onSuccess: (result) => {
            setModalOpen(true);
        },
        onError: (result) => {
            setModalOpen(true);
        }
    });
    const { setTitle } = useTitle();
    useEffect(() => {
        setTitle("Agent Registration");
    }, [setTitle])
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            scrollToFirstError(errors, refMap);
        }
    }, [errors,refMap]);
    return (
        <div className="container">
            <div className={styles["register-container"]}>
                <div className={styles['register-details']}>
                    <div className={styles['register-form']}>
                        <Input ref={refMap.name} labelText="Full Name" name="name" onChange={handleInputChange("name")} value={formData.name} errorText={errors.name} />
                        <Input ref={refMap.mobile} labelText="Mobile No" name="mobile" onChange={handleInputChange("mobile")} value={formData.mobile} errorText={errors.mobile} />
                        <Input ref={refMap.email} labelText="Email ID" name="email" onChange={handleInputChange("email")} value={formData.email} errorText={errors.email} />
                        <PasswordInput
                            ref={refMap.password}
                            name="password"
                            labelText="Password"
                            value={formData.password}
                            onChange={handleInputChange("password")}
                            errorText={errors.password}
                        />

                        <PasswordInput
                            ref={refMap.confirm_password}
                            name="confirm_password"
                            labelText="Confirm Password"
                            value={formData.confirm_password}
                            onChange={handleInputChange("confirm_password")}
                            errorText={errors.confirm_password}
                        />


                        <div className={styles["flex-class"]}>
                            <div className={styles["radioGroup"]}>
                                <div className={styles["flex-class"]}>Gender</div>
                                <RadioButton variant="radiobtns" name="gender" labeltext="Male" value="Male" checkedValue={formData.gender} onChange={handleRadioChange('gender')} />
                                <RadioButton variant="radiobtns" name="gender" labeltext="Female" value="Female" checkedValue={formData.gender} onChange={handleRadioChange('gender')} />
                            </div>
                        </div>

                        <CustomDatePicker ref={refMap.dob} selectedDate={formData.dob} onChange={(date) => handleDateChange('dob', date)} label="Date of Birth (DD/MM/YYYY)" placeholder="DD/MM/YYYY" errorText={errors.dob} />

                        <Input ref={refMap.address1} labelText="Address Line 1" name="address1" onChange={handleInputChange("address1")} value={formData.address1} errorText={errors.address1} />
                        <Input ref={refMap.address2} labelText="Address Line 2" name="address2" onChange={handleInputChange("address2")} value={formData.address2} />
                        <Input ref={refMap.area} labelText="Area" name="area" value={formData.area} onChange={handleInputChange("area")} errorText={errors.area} />
                        <Selectdropdown id={"city"} ref={refMap.city} options={City} selectText="Select City" setSelectedOption={(value) => handleSelectChange("city", value)} selectedOption={formData.city} errorText={errors.city} />
                        <Selectdropdown id={"state"} ref={refMap.state} options={State} selectText="Select State" setSelectedOption={(value) => handleSelectChange("state", value)} selectedOption={formData.state} errorText={errors.state} />
                        <Input ref={refMap.zip} labelText="Zip" name="zip" value={formData.zip} onChange={handleInputChange("zip")} errorText={errors.zip} />
                    </div>

                    <div className={styles["login-section"]}>
                        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
                        <Button variant="outline" path="/">Back to Login</Button>
                    </div>
                </div>

                <div className={styles.bottom}>
                    {modalOpen && (
                        <div className={styles.overlay}>
                            <InfoModal
                                errorStatus={isError}
                                Title={isError ? "Error in Agent Registration" : "Registration Successful"}
                                Content={isError ? response?.error?.message : "Login to Continue..."}
                                onOpen={modalOpen}
                                onClose={() => handleCloseModal(!isError)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
