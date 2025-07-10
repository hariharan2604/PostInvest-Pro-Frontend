"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import { useRouter } from "next/navigation";
import Footer from "../Footer/Footer";
import { useTitle } from "@/contexts/TitleContext";
import { MenuList } from "../common/MenuItems";

const Header = ({ showLeftArrow, navigate = "/dashboard", footer = true }) => {
  const { title } = useTitle();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(navigate);
    }
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.iconGroup}>
            {showLeftArrow && (
              <Image src={leftArrow} onClick={handleBack} alt="Left Arrow" />
            )}
            <h1>{title}</h1>
          </div>
        </div>

        <div className={styles.footerSection}>
          <div className={styles.mobileMenu}>
            <Image src={Menu} alt="Menu" onClick={() => setShowMenu(!showMenu)} />
          </div>

          {showMenu && (
            <div className={styles.popupMenu}>
              <MenuList onClick={() => setShowMenu(false)} activeClass={styles.active} />
            </div>
          )}

          {footer && <Footer hideMobileMenu />}
        </div>
      </header>
    </div>
  );
};

export default Header;
