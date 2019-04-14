import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Bill.module.scss'
import { parseDate } from '../utils'
import { currency } from '../config'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ users: state.users.all })

const Bill = ({ bill, users }) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const paidBy = users[bill.paid.userId]

  return (
    <div className={styles.bill} onClick={toggleExpanded}>
      <div className={styles.content}>
        <div className={styles.column}>
          <span className={styles.minor}>{parseDate(bill.date)}</span>
          <span className={styles.large}>{bill.title}</span>
        </div>
        <div className={classNames(styles.column, styles['to-right'])}>
          {paidBy && <span className={styles.minor}>{paidBy.name} paid</span>}
          <div className={styles.medium}>
            <span>{bill.paid.amount}</span> <span>{currency}</span>
          </div>
        </div>
      </div>
      {expanded && <div className={styles.expanded}>Nothing to show</div>}
    </div>
  )
}

export default connect(mapStateToProps)(Bill)
