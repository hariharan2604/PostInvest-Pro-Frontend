import Image from "next/image"
import Link from "next/link"
import profileImage from '@icons/Profile-image.svg'
import help from '@icons/help.svg'
import userprofile from '@icons/user-profile.svg'
import lock from '@icons/lock.svg'
import logout from '@icons/logout.svg'
import styles from './menu.module.scss'
export default function Menu({ profileName, profileId }) {
    return (
        <>
            <div className={styles.menu}>
                <div>
                    <Image src={profileImage} alt="profile-image" />
                    <h2>{profileName}</h2>
                    <span>{profileId} |</span>

                </div>
                <div className={styles['menu-items']}>
                    <Link href=''><Image src={userprofile} alt='Image' />My account</Link>
                    <Link href=''><Image src={lock} alt='Image' />Change passwords </Link>
                    <Link href=''><Image src={help} alt='Image' />Help & Support</Link>
                    <Link href='/'><Image src={logout} alt='Image' />Logout</Link>
                </div>
            </div>
        </>
    )
}