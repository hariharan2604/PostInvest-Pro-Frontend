"use client"
import React, { Suspense } from "react";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container">
        <main className={styles.layout}>{children}
          <div id="datepicker-portal" />
        </main>
      </div>
    </>
  );
};

export default Layout;
