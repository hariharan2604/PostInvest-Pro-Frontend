"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import leftArrow from "@icons/arrow-left.svg";
import Menu from "@icons/menu.svg";
import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Inventory from "@icons/coin_black.svg";
import Investment from "@icons/investment.svg";
import { usePathname,useRouter } from "next/navigation";
import Footer from "../Footer/Footer";
import { useTitle } from "@/contexts/TitleContext";

const Header = ({ showLeftArrow, navigate = "/dashboard", footer = true }) => {
  const { title } = useTitle();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();

  const menuItems = [
    { path: "/dashboard", text: "Home", icon: Home },
    { path: "/remittance", text: "Remittance", icon: Remittance },
    { path: "/profile", text: "Customer", icon: User },
    { path: "/viewChequeLeaf", text: "Inventory", icon: Inventory },
    { path: "/fund", text: "Investment", icon: Investment },
  ];

  const isActive = (item) => {
    const isDashboardActive =
      item.path === "/dashboard" &&
      ["/viewMaturityDue", "/viewChequeLeaf"].includes(pathname);
    const isProfileActive =
      item.path === "/profile" &&
      (pathname.includes("customer") || pathname === "/family-members");
    return pathname === item.path || isDashboardActive || isProfileActive;
  };

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
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={isActive(item) ? styles.active : ""}
                  onClick={() => setShowMenu(false)}
                >
                  <Image src={item.icon} priority alt="Menu Icon" />
                  <span>{item.text}</span>
                </Link>
              ))}
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
