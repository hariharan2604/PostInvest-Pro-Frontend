"use client"
import style from "./all-customer.module.scss";
import SearchHead from "../search-header/search-header";
import Link from "next/link";
import Profile from "@/components/ui/profile/profile";

import Checkbox from "@/components/ui/checkbox/checkbox";
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/button';
import React from 'react';

export default function AllCustomer() {
  const [customers, setCustomers] = useState([]);

  const handleDataFetch = (result) => {
    setCustomers(result);
  }

  return (
    <>
      <SearchHead enableAdd={true} showRouteOptions={false} enableDropdown={false} onDataFetched={handleDataFetch} />
      {/* <Checkbox labelVale="Active Customer" /> */}
      <div className={style["schemesInfo"]}>
        <div className={style["innerContent"]}>
          {customers.map((customer, index) => (
            <div key={index}  className={style["listGroup"]}>
              <div className={style["dataGroup"]}>
                <Link href={`/customer-info/${customer.id}`} passHref>
                  <div className={style["profile_text_group"]}>
                    <Profile
                      variant="profileIcon"
                      profileStatus={customer.profileStatus}
                    />
                    <div className={style["detail_info"]}>
                      <p>{customer.name}</p>
                      <span>
                        {customer.mobile} | {customer.email} | {customer.area}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className={style["addAMount"]}>
                  <div className={style["addIcon"]}>
                    <Button variant="linkButton" path={`/scheme?id=${encodeURI(customer.id)}&customer_name=${encodeURI(customer.name)}`}>
                      Add Investment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
