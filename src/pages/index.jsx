
import Image from "next/image";
import login from '../../public/images/login.png'
import Input from "@/components/ui/input/input";
import IconInput from "@/components/ui/icon-input/icon-input";
import Button from "@/components/ui/button/button";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="login-container">
        <div className="logo-wrapper">

          <Image src={login} className="logo" alt="login-image" />
        </div>
        <div>

          <div className="login-details">
            <h3><span>Welcome</span> Broker Management !</h3>
            <p>Please use your credentials to login</p>
            <div className="login-credentials">
              <Input labelText="User ID" name="user_id" />
              <IconInput variant='eye' labelText='Password' />
            </div>
            <Link href="">Forgot Password?</Link>
            <div className="login-section">
              <Button variant="primary" path='/dashboard'>Login</Button>
              <Button variant="outline" path='/registration'>Create Account</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
