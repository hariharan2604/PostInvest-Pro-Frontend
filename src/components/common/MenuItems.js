"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Home from "@icons/home.svg";
import Remittance from "@icons/remittance.svg";
import User from "@icons/footer-user.svg";
import Inventory from "@icons/coin_black.svg";
import Investment from "@icons/investment.svg";

export const menuItems = [
    { path: "/dashboard", text: "Home", icon: Home },
    { path: "/remittance", text: "Remittance", icon: Remittance },
    { path: "/profile", text: "Customer", icon: User },
    { path: "/viewChequeLeaf", text: "Inventory", icon: Inventory },
    { path: "/fund", text: "Investment", icon: Investment },
];

export const isActiveRoute = (pathname, item) => {
    const isDashboardActive =
        item.path === "/dashboard" &&
        ["/viewMaturityDue", "/viewChequeLeaf"].includes(pathname);
    const isProfileActive =
        item.path === "/profile" &&
        (pathname.includes("customer") || pathname === "/family-members");
    return pathname === item.path || isDashboardActive || isProfileActive;
};

export const MenuList = ({
    onClick,
    activeClass = "",
    showLabel = true,
    wrapperClass = "",
}) => {
    const pathname = usePathname();
    return (
        <div className={wrapperClass}>
            {menuItems.map((item, index) => {
                const active = isActiveRoute(pathname, item);
                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={active ? `${activeClass}` : ""}
                        onClick={onClick}
                    >
                        <Image src={item.icon} alt={item.text} />
                        {showLabel && <span>{item.text}</span>}
                    </Link>
                );
            })}
        </div>
    );
};
