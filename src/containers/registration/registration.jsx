
import Input from "@/components/ui/input/input";
import Button from "@/components/ui/button/button";

import styles from './registration.module.scss'
export default function Registration() {
    return (
        <>
            <div className={styles['register-details']}>

                <div className={styles['register-form']}>
                    <Input labelText="Full Name" name="user_id" />
                    <Input labelText="Mobile No" name="mobile_no" />
                    <Input labelText="Email ID" name="email_id" />
                    <Input labelText="Gender" name="gender" />
                    <Input labelText="Date of Birth" name="date_of_birth" />
                    <Input labelText="Address" name="address" />
                    <Input labelText="Area" name="area" />
                    <Input labelText="Zip" name="zip" />
                    <Input labelText="User ID" name="user_id" />
                </div>
                <div className="login-section">
                    <Button variant="primary" path='/dashboard'>Submit</Button>
                    <Button variant="outline" path='/'>Back to Login</Button>
                </div>
            </div >
        </>
    )
}