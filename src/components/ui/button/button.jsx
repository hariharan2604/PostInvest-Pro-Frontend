"use client"
import button from "./button.module.scss";
import AddIcon from "@icons/add.svg";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'


export default function Button({ variant, children, onClick, borderRadius, margintop, buttonWt, buttonMaxwt, showIcon = false, path }) {
  const router = useRouter();
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  let classSet = `${button.btn} `;

  if (variant === "outline") {
    classSet += `${button.outline} `;
  } else if (variant === "primary") {
    classSet += `${button.primary} `;
  } else if (variant === "iconButton") {
    classSet += `${button.iconButton} `;
  } else if (variant === "linkButton") {
    classSet += `${button.linkButton} `;
  }

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (path) {
      router.push(path);
    }
  };

  return (
    <>
      <button className={classSet} onClick={handleClick}>
        {showIcon && <Image src={AddIcon} alt="icon" className={button.icon} />}
        <span>{children ? children : "sample"}</span>
      </button>
      <style jsx>{`
        button {
          border-radius: ${borderRadius};
          width: ${buttonWt};
          max-width: ${buttonMaxwt};
          margin-top:${margintop}
        }
      `}</style>
    </>
  );
}
