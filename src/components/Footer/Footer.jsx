"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Inventory from "@icons/coin_black.svg";
import Investment from "@icons/investment.svg";

const Footer = ({ hideMobileMenu = false }) => {
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

  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <div className={styles.desktopMenu}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={isActive(item) ? styles.active : ""}
              prefetch
            >
              <Image src={item.icon} priority alt="Menu Icon" />
              <span>{isActive(item) ? item.text : ""}</span>
            </Link>
          ))}
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
