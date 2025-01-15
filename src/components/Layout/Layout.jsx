"use client"
import React, { Suspense } from "react";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <main className={styles.layout}>{children}</main>
        <div className={styles.mobVisible}>
          {footer && <Footer />}
        </div>
      </div>
    </>
  );
};

export default Layout;
