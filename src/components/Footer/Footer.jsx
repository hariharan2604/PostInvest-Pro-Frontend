"use client"
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from "next/image";
import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Menu from "@icons/menu.svg";
import Inventory from "@icons/coin_black.svg"
import Investment from "@icons/investment.svg"
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  const menuItems = [
    {
      path: "/dashboard",
      text: "Home",
      icon: Home,
    },
    {
      path: "/remittance",
      text: "Remittance",
      icon: Remittance,
    },
    {
      path: "/profile",
      text: "Customer",
      icon: User,
    },
    {
      path: "/viewChequeLeaf",
      text: "Inventory",
      icon: Inventory,
    },
    {
      path: "/fund",
      text: "Investment",
      icon: Investment,
    },
    {
      path: "/menu",
      text: "Menu",
      icon: Menu,
    },
  ];
  const pathname = usePathname()
  return (
    <>
      <div className="container">
        <footer className={styles.footer}>
          <div className={styles.nav}>
            {menuItems.map((item, index) => {
              const isDashboardActive =
                item.path === "/dashboard" &&
                ["/viewMaturityDue", "/viewChequeLeaf"].includes(pathname);

              const isProfileActive =
                item.path === "/profile" &&
                (pathname.includes("customer") || pathname === "/family-members");

              const isActive =
                pathname === item.path || isDashboardActive || isProfileActive;

              return (
                <Link
                  key={index}
                  href={item.path}
                  className={isActive ? styles.active : ""}
                  prefetch
                >
                  <Image src={item.icon} priority alt="Menu Icons" />
                  <span>{isActive ? item.text : ""}</span>
                </Link>
              );
            })}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
