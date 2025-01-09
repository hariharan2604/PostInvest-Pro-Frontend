import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Notification from "@icons/notification.svg";

import Link from "next/link";
import Footer from "../Footer/Footer";

const Header = ({ title, showLeftArrow, notifyToIcon, navigate = "/default-path" }) => {
  return (
    <>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.iconGroup}>
            {showLeftArrow && (
              <Link href={navigate}>
                <Image src={leftArrow} alt="Left Arrow Image" />
              </Link>
            )}
            <h1>{title}</h1>
          </div>
          <div>
            <div className={styles.webVisible}>
              <Footer />
            </div>
          </div>
          {notifyToIcon && (
            <div className={styles.notifyToIcon}>
              <Image src={Notification} alt="Notification Icon" />
            </div>
          )}
        </header>
      </div>
    </>

  );
};

export default Header;
