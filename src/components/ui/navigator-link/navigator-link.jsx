"use client"
import Link from 'next/link';
import navigateStyle from "./navigator-link.module.scss";
import Image from 'next/image';

import arrowIcon from "@icons/Arrow.svg";
import AddMember from '@icons/add-member.svg';

export default function NavigateLinkComponent({ variant, navigateLink = "/default-path", navigateLabel = "Navigate", children, isShowNavigateImg, iconPosition = "right" }) {
    return (
        <Link className={`${navigateStyle['navigateLink']} ${variant ? navigateStyle[variant] : ''}`} href={navigateLink}>
            {iconPosition === "left" && !isShowNavigateImg && <Image src={AddMember} alt='' />}
            {navigateLabel}
            {children}
            {iconPosition === "right" && !isShowNavigateImg && <Image src={arrowIcon} alt='' />}
        </Link>
    );
}
