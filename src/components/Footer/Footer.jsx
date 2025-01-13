"use client"
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from "next/image";
import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Menu from "@icons/menu.svg";
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
      path: "/menu",
      text: "Menu",
      icon: Menu,
    },
  ];
  // const router = useRouter();
  const pathname = usePathname()
  // const searchParams = useSearchParams()
  return (
    <>
      <div className="container">
        <footer className={styles.footer}>
          <div className={styles.nav}>
            {menuItems.map((item, index) => (
              <Link key={index}
                href={item.path}
                className={pathname === item.path || (item.path === "/dashboard" && pathname === '/viewMaturityDue') || (item.path === "/dashboard" && pathname === '/viewChequeLeaf') ? styles.active : ""} prefetch>
                <Image src={item.icon} priority alt="Menu Icons" ></Image>
                <span>

                  {pathname === item.path || (item.path === "/dashboard" && pathname === '/viewMaturityDue') || (item.path === "/dashboard" && pathname === '/viewChequeLeaf') ? item.text : ""}
                </span>
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
