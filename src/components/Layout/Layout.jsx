"use client"
import React, { Suspense } from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <main className={styles.layout}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
