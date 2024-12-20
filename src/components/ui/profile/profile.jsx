import profile from "./profile.module.scss";
import user from "../../../../public/images/user.svg";
import Image from "next/image";

export default function Profile({ variant, profileText, profileStatus }) {
  let userSet = `${profile.profile} `;
  if (profileStatus === "active" && variant === "profileIcon") {
    userSet += `${profile.profileActive} `;
  } else if (profileStatus === "disable") {
    userSet += `${profile.profileInactive} `;
  }

  return (
    <>
      {variant === "profileText" ? (
        <div className={userSet}>
          <span>{profileText}</span>
        </div>
      ) : (
        <div className={userSet}>
          <Image src={user} alt="user" />
        </div>
      )}
    </>
  );
}
