import React from 'react'
import styles from './checkUser.module.scss'
import ChequeLeaf from '../cheque-leaf/cheque-leaf'
import NavigateLinkComponent from '@/components/ui/navigator-link/navigator-link'
import DividerLine from '@/components/ui/divider-line/divider-line'
import MaturityDue from '../maturity-due/maturity-due'
const CheckUser = () => {
  return (
    <>
      <div className={styles.flexContainer}>
        <div>
          <ChequeLeaf />
          <NavigateLinkComponent navigateLink="/viewChequeLeaf" navigateLabel="View All" />
          <div className={styles.responsiveLine}>
            <DividerLine />
          </div>
        </div>
        <div>
          <MaturityDue />
          <NavigateLinkComponent navigateLink="/viewMaturityDue" navigateLabel="View All" />
        </div>
      </div>
    </>
  )
}

export default CheckUser