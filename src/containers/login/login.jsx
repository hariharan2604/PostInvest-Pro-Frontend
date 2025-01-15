"use client"
import styles from "./login.module.scss";
import Image from "next/image";
import login from '@icons/login.svg'
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({})
    const handleInputChange = (field) => (value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };
    const submitData = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();


            if (result.success) {
                router.push("/dashboard");
            }
            else {
                setErrors((prevData) => ({
                    ...prevData,
                    ["response"]: result.message,
                }));
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) newErrors.username = "Full Name is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            submitData();
        }
    }
    return (
        <>
            <div className={styles["login-container"]}>
                <div className={styles["login-details"]}>
                <div className={styles["logo-wrapper"]}>
                        <Image src={login} height={150} width={150} className={styles["logo"]} alt="login-image" priority={true} />
                    <div>
                        <h3><span>Welcome</span></h3>
                        <p>Please use your credentials to login</p>
                    </div>
                </div>
                    <div className={styles["login-credentials"]}>
                        <Input labelText="User ID" name="user_id" onChange={handleInputChange("username")} value={formData.username} errorText={errors.username} />
                        <IconInput variant='eye' labelText='Password' onChange={handleInputChange("password")} value={formData.password} errorText={errors.password} />
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

