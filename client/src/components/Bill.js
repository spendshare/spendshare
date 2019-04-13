import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Bill.module.scss'
import { parseDate } from '../utils'
import { currency } from '../config'

export default ({ bill }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className={styles.bill} onClick={toggleExpanded}>
      <div className={styles.content}>
        <div className={styles.column}>
          <span className={styles.minor}>{parseDate(bill.date)}</span>
          <span className={styles.large}>{bill.title}</span>
        </div>
        <div className={classNames(styles.column, styles['to-right'])}>
          <span className={styles.minor}>{bill.paid.name} paid</span>
          <div className={styles.medium}>
            <span>{bill.paid.amount}</span> <span>{currency}</span>
          </div>
        </div>
      </div>
      {expanded && <div className="expanded">More info will come here...</div>}
    </div>
  )
}
