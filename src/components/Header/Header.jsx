"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTitle } from "@/contexts/TitleContext";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import Footer from "../Footer/Footer";
import { MenuList } from "../Menu/MenuList";
import { isActiveRoute, menuItems } from "../Menu/menuItems";

const Header = ({ showLeftArrow, navigate = "/dashboard", footer = true }) => {
  const { title } = useTitle();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

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
          {/* Mobile menu trigger */}
          <div className={styles.mobileMenu}>
            <Image src={Menu} alt="Menu" onClick={() => setShowMenu(!showMenu)} />
          </div>

          {/* Mobile popup menu */}
          {showMenu && (
            <div className={styles.popupMenu}>
              <MenuList
                onClick={() => setShowMenu(false)}
                activeClass={styles.active}
              />
            </div>
          )}

          {/* Footer for desktop */}
          {footer && <Footer hideMobileMenu />}
        </div>
      </header>
    </div>
  );
};

export default Header;
