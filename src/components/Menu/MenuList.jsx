"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { menuItems, isActiveRoute } from "./menuItems";

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
