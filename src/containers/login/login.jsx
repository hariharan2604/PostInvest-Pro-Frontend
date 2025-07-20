"use client"
import styles from "./login.module.scss";
import Image from "next/image";
import login from '@icons/login.svg'
import Input from "@/components/ui/input/input";
import PasswordInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import Link from "next/link";
import { useFormHandler } from "@/app/_hooks/useFormHandler";
import React from "react";
import { rules } from "./rules";
import { initialFormData } from "./formData";


export default function Home() {
    
    const {
        formData,
        errors,
        handleInputChange,
        handleSubmit,
        setErrors,
    } = useFormHandler({
        initialFormData,
        validationRules: rules,
        apiEndpoint: '/api/auth/login',
        redirectPath: '/dashboard',
        forwardPath: true,
        onError: (result) => {
            setErrors((prevData) => ({
                ...prevData,
                ["response"]: result.error.message,
            }));
        },
        

    });
    return (
        <>
            <div className={styles["login-container"]}>
                <div className={styles["login-details"]}>
                    <div className={styles["logo-wrapper"]}>
                        <Image src={login} height={150} width={150} className={styles["logo"]} alt="login-image" priority={true} />
                        <div>
                            <h3><span>Welcome</span></h3>
                            <p>Login to Continue..</p>
                        </div>
                    </div>
                    <div className={styles["login-credentials"]}>
                        <Input labelText="User ID" name="username" onChange={handleInputChange("username")} value={formData.username} errorText={errors.username} />

                        <PasswordInput variant='eye' name="password" labelText='Password' onChange={handleInputChange("password")} value={formData.password} errorText={errors.password} />
                    </div>
                    <Link href="">Forgot Password?</Link>
                    {errors.response && <span>{errors.response}</span>}
                    <div className={styles["login-section"]}>
                        <Button variant="primary" onClick={handleSubmit}>Login</Button>
                        <Button variant="outline" path='/registration'>Create Account</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

