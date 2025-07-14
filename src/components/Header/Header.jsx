"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTitle } from "@/contexts/TitleContext";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import { menuItems, isActiveRoute } from "../Menu/menuItems";

const Header = ({ showLeftArrow, navigate = "/dashboard", disableMobileMenu = false }) => {
  const { title } = useTitle();
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const popupRef = useRef(null);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(navigate);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Close menu on route change
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <div className="container">
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <div className={styles.iconGroup}>
            {showLeftArrow && (
              <Image
                src={leftArrow}
                onClick={handleBack}
                alt="Go back"
                role="button"
                tabIndex={0}
              />
            )}
            <h1>{title}</h1>
          </div>
        </div>

        {!disableMobileMenu && (
          <div className={styles.footerSection}>
            {/* Desktop Menu */}
            <div className={styles.desktopMenu}>
              {menuItems.map((item, index) => {
                const isActive = isActiveRoute(pathname, item);
                return (
                  <Link
                    key={index}
                    href={item.path}
                    className={isActive ? styles.active : ""}
                  >
                    <Image src={item.icon} alt={`${item.text} icon`} />
                    {isActive && <span>{item.text}</span>}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Icon */}
            <div className={styles.mobileMenu}>
              <Image
                src={Menu}
                alt="Toggle menu"
                onClick={() => setShowMenu(!showMenu)}
                role="button"
                tabIndex={0}
              />
            </div>

            {/* Mobile Popup Menu */}
            {showMenu && (
              <div className={styles.popupMenu} ref={popupRef}>
                {menuItems.map((item, index) => {
                  const isActive = isActiveRoute(pathname, item);
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      className={isActive ? styles.active : ""}
                    >
                      <Image src={item.icon} alt={`${item.text} icon`} />
                      <span>{item.text}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
