"use client"
import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Notification from "@icons/notification.svg";
import { useRouter } from "next/navigation";
import Footer from "../Footer/Footer";
import Button from "../ui/button/button";
import { useTitle } from "@/contexts/TitleContext";

const Header = ({ showLeftArrow, notifyToIcon, navigate = "/dashboard", footer = true }) => {
  const { title } = useTitle();
  const router = useRouter();
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(navigate);
    }
  };

  return (
    <>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.iconGroup}>
            {showLeftArrow && (
                <Image src={leftArrow} onClick={handleBack} alt="Left Arrow Image" />
            )}
            <h1>{title}</h1>
          </div>
          {footer && <div>
            <div className={styles.webVisible}>
              <Footer />
            </div>
          </div>}
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
