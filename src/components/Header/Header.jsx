"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTitle } from "@/contexts/TitleContext";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import { menuItems, isActiveRoute } from "../Menu/menuItems";

const Header = ({ showLeftArrow, navigate = "/dashboard" }) => {
  const { title } = useTitle();
  const router = useRouter();
  const pathname = usePathname();
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
              <Image src={leftArrow} onClick={handleBack} alt="Back" />
            )}
            <h1>{title}</h1>
          </div>
        </div>

        <div className={styles.footerSection}>
          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={isActiveRoute(pathname, item) ? styles.active : ""}
              >
                <Image src={item.icon} alt="Menu Icon" />
                <span>{isActiveRoute(pathname, item) ? item.text : ""}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Icon */}
          <div className={styles.mobileMenu}>
            <Image src={Menu} alt="Menu" onClick={() => setShowMenu(!showMenu)} />
          </div>

          {/* Mobile Popup Menu */}
          {showMenu && (
            <div className={styles.popupMenu}>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={isActiveRoute(pathname, item) ? styles.active : ""}
                  onClick={() => setShowMenu(false)}
                >
                  <Image src={item.icon} alt="Menu Icon" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
