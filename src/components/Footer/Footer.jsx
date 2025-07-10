"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Menu from "@icons/menu.svg";
import Image from "next/image";
import { MenuList } from "../common/MenuItems";

const Footer = ({ hideMobileMenu = false }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <div className={styles.desktopMenu}>
          <MenuList showLabel={false} activeClass={styles.active} />
        </div>

        {!hideMobileMenu && (
          <div className={styles.mobileMenu}>
            <Image src={Menu} alt="Menu" />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
