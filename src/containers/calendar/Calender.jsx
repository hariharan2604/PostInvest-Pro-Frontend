import React from 'react'

import styles from './Calendar.module.scss'
import calenderLeft from '../../../public/images/leftCalender.svg'
import calenderRight from '../../../public/images/rightCalender.svg'
import calendarIcon from '../../../public/images/calendarIcon.svg'

import Image from 'next/image'
const Calender = () => {
  return (
    <>
      <div className={styles.calendarWrapper}>
        <Image src={calenderLeft} alt='Image' ></Image>
        <div className={styles.calendarArea}>
          <Image src={calendarIcon} alt='Image'></Image>
          <p>July 2024 (1-15)</p>
        </div>
        <Image src={calenderRight} alt='Image'></Image>
      </div>
    </>
  )
}

export default Calender