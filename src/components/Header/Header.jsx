import React from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import leftArrow from "../../../public/images/arrow-left.svg";
import Notification from "../../../public/images/notification.svg";

import Link from "next/link";
import Footer from "../Footer/Footer";

const Header = ({ title, showLeftArrow, notitficatoIcon, navigate = "/default-path" }) => {
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
          {notitficatoIcon && (
            <div className={styles.notitficatoIcon}>
              <Image src={Notification} alt="Notification Icon" />
            </div>
          )}
        </header>
      </div>
    </>

  );
};

export default Header;
