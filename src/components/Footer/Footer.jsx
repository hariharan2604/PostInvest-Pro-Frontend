import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Home from "../../../public/images/home.svg";
import Remittance from "../../../public/images/remittance.svg";
import User from "../../../public/images/footer-user.svg";
import Menu from "../../../public/images/menu.svg";
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
  const router = useRouter();

  return (
    <>
      <div className="container">
        <footer className={styles.footer}>
          <div className={styles.nav}>
            {menuItems.map((item, index) => (
              <Link key={index}
                href={item.path}
                className={router.pathname === item.path || (item.path === "/dashboard" && router.pathname === '/viewMaturityDue') || (item.path === "/dashboard" && router.pathname === '/viewChequeLeaf') ? styles.active : ""} prefetch>
                <Image src={item.icon} priority alt="Menu Icons" ></Image>
                <span>

                  {router.pathname === item.path || (item.path === "/dashboard" && router.pathname === '/viewMaturityDue') || (item.path === "/dashboard" && router.pathname === '/viewChequeLeaf') ? item.text : ""}
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
