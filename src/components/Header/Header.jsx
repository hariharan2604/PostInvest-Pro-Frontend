"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTitle } from "@/contexts/TitleContext";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import UserIcon from "@icons/user.svg";
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

        {/* ✅ Centered Desktop Menu */}
        {!disableMobileMenu && (
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
        )}

        {/* ✅ User Icon + Mobile Menu */}
        {!disableMobileMenu && (
          <div className={styles.footerSection}>
            <Link href="/menu" className={styles.userIcon}>
              <Image src={UserIcon} alt="User menu" />
            </Link>

            <div className={styles.mobileMenu}>
              <Image
                src={Menu}
                alt="Toggle menu"
                onClick={() => setShowMenu(!showMenu)}
                role="button"
                tabIndex={0}
              />
            </div>

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
