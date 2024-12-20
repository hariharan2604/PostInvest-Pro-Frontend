import Image from "next/image"
import Link from "next/link"
import profileImage from '../../../public/images/Profile-image.svg'
import help from '../../../public/images/help.svg'
import userprofile from '../../../public/images/user-profile.svg'
import lock from '../../../public/images/lock.svg'
import logout from '../../../public/images/logout.svg'
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