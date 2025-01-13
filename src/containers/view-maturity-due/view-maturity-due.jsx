// 'use client'
import Image from "next/image";
import styles from '@/containers/maturity-due/maturity-due.module.scss';
import Pill from "@/components/ui/pill/pill";
import Profile from "@/components/ui/profile/profile";
import Title from "@/components/ui/title/title";

const data = [
  {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillRed",
    userAcoount: "#000132596",
    pillNumber: "1",
    pillText: "Day",
    paymentMode: "text",
    funds: "Rd"

  }, {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillRed",
    userAcoount: "#000132596",
    pillNumber: "1",
    pillText: "Day",
    paymentMode: "text",
    funds: "Rd"

  }, {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillRed",
    userAcoount: "#000132596",
    pillNumber: "1",
    pillText: "Day",
    paymentMode: "text",
    funds: "Rd"

  },
  {
    userName: "Rithika",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillOrange",
    userAcoount: "#000132596",
    pillNumber: "3",
    pillText: "Days",
    paymentMode: "text",
    funds: "FD"

  },
  {
    userName: "Rithika",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillOrange",
    userAcoount: "#000132596",
    pillNumber: "3",
    pillText: "Days",
    paymentMode: "text",
    funds: "FD"

  },
  {
    userName: "Rithika",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillOrange",
    userAcoount: "#000132596",
    pillNumber: "3",
    pillText: "Days",
    paymentMode: "text",
    funds: "FD"

  },
  {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillGreen",
    userAcoount: "#000132596",
    pillNumber: "5",
    pillText: "Days",
    paymentMode: "text",
    funds: "PF"
  },
  {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillGreen",
    userAcoount: "#000132596",
    pillNumber: "5",
    pillText: "Days",
    paymentMode: "text",
    funds: "PF"
  },
  {
    userName: "Annasamy",
    userDetails: "+91 987654321 | July 24",
    pillVariant: "pillGreen",
    userAcoount: "#000132596",
    pillNumber: "5",
    pillText: "Days",
    paymentMode: "text",
    funds: "PF"
  },


];

export default function ViewMaturityDue() {
  return (
    <div className={styles.maturityDue}>
      <Title titleValue={'20 Due'} />

      <div className={styles["due-inner"]}>
        {data.map((user, index) => (
          <div key={index} className={styles["userDetails"]}>
            <div className={styles["split"]}>

              <Profile
                variant="profileText"
                profileText={user.funds}
              />
              <div className={styles["userInfo"]}>
                <label className={styles["userAccount"]}>{user.userAcoount}</label>
                <p className={styles["userName"]}>{user.userName}</p>
                <p className={styles["userPhone"]}>{user.userDetails}</p>
              </div>
            </div>
            <div className={styles["pillStatus"]}>
              <Pill
                variant={user.pillVariant}
                pillNumber={user.pillNumber}
                pillText={user.pillText}
                paymentMode={user.paymentMode}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
