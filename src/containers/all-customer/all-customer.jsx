"use client";
import style from "./all-customer.module.scss";
import SearchHead from "../search-header/search-header";
import Link from "next/link";
import Profile from "@/components/ui/profile/profile";
import Checkbox from "@/components/ui/checkbox/checkbox";
import React, { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/button/button";
import { useTitle } from "@/contexts/TitleContext";

export default function AllCustomer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useTitle();

  const handleDataFetch = useCallback((result) => {
    setCustomers(result);
    setLoading(false);
  }, []);

  useEffect(() => {
    setTitle("Customer Dashboard");
  }, [setTitle]);

  return (
    <>
      <SearchHead
        fetchOnFocus={false}
        allowEmptySearch={true}
        enableAdd={true}
        showRouteOptions={false}
        enableDropdown={false}
        onDataFetched={handleDataFetch}
      />

      <div className={style["schemesInfo"]}>
        <div className={style["innerContent"]}>
          {loading ? (
            <div className={style["loading"]}>
              <p>Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className={style["noData"]}>
              <p>No customers found.</p>
            </div>
          ) : (
            customers.map((customer, index) => (
              <div key={index} className={style["listGroup"]}>
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
                    <Button
                      variant="linkButton"
                      path={`/scheme?id=${encodeURI(customer.id)}&customer_name=${encodeURI(customer.name)}`}
                    >
                      Add Investment
                    </Button>
                    <Button
                      variant="linkButton"
                      path={`/receipt?id=${encodeURI(customer.id)}&customer_name=${encodeURI(customer.name)}`}
                    >
                      Add Receipt
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
