import React from 'react'

import styles from './Calendar.module.scss'
import calendarLeft from '../../../public/images/leftCalender.svg'
import calendarRight from '../../../public/images/rightCalender.svg'
import calendarIcon from '../../../public/images/calendarIcon.svg'

import Image from 'next/image'
const Calendar = () => {
  return (
    <>
      <div className={styles.calendarWrapper}>
        <Image src={calendarLeft} alt='Image' ></Image>
        <div className={styles.calendarArea}>
          <Image src={calendarIcon} alt='Image'></Image>
          <p>July 2024 (1-15)</p>
        </div>
        <Image src={calendarRight} alt='Image'></Image>
      </div>
    </>
  )
}

export default Calendar