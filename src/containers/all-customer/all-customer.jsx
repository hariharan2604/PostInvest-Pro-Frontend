import { useRouter } from "next/router";
import style from "./all-customer.module.scss";
import SearchHead from "../search-header/search-header";
import Link from "next/link";
import Profile from "@/components/ui/profile/profile";

import Add from "@icons/icon-add.svg";
import Image from "next/image";
import Checkbox from "@/components/ui/checkbox/checkbox";

export default function AllCustomer() {
  const router = useRouter();

  const schemesData = [
    {
      phone: "9840066220",
      location: "Salem",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileStatus: "active",
    },
    {
      phone: "9840066220",
      location: "chennai",
      id: "#000132597",
      name: "Aadhavan",
      amount: "-",
      profileStatus: "disable",
    },
    {
      phone: "9840066220",
      location: "chennai",
      name: "Aadhavan",
      amount: "-",
      profileStatus: "disable",
    },
    {
      phone: "9840066220",
      location: "chennai",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileStatus: "active",
    },
    {
      phone: "9840066220",
      location: "chennai",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileStatus: "active",
    },
    {
      phone: "9840066220",
      location: "Salem",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileStatus: "active",
    },
    {
      phone: "9840066220",
      location: "chennai",
      name: "Aadhavan",
      amount: "₹2500.00",
      profileStatus: "active",
    },
  ];

  const handleAddIconClick = (event) => {
    event.preventDefault();
    router.push(`/scheme`);
  };

  return (
    <>
      <SearchHead />
      <Checkbox labelVale="Active Customer" />
      <div className={style["schemesInfo"]}>
        <div className={style["innerContent"]}>
          {schemesData.map((scheme, index) => (
            <Link href="/customer-info" key={index} passHref className={style["listGroup"]}>
              <div className={style["dataGroup"]}>
                <div className={style["profile_text_group"]}>
                  <Profile
                    variant="profileIcon"
                    profileStatus={scheme.profileStatus}
                  />
                  <div className={style["detail_info"]}>
                    <p>{scheme.name}</p>
                    <span>
                      {scheme.phone} | {scheme.location}
                    </span>
                  </div>
                </div>
                <div className={style["addAMount"]}>
                  <div className={style["amountInfo"]}>
                    <span>#Amount</span>
                    <p>{scheme.amount}</p>
                  </div>
                  <div className={style["addIcon"]}>
                    <Image
                      src={Add}
                      alt="Add Icon"
                      onClick={(event) => handleAddIconClick(event, index)}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
