import React from 'react'
import styles from './User.module.scss'
import { currency } from '../config'
import { getAvatar } from '../utils'
import Tooltip from './Tooltip'

const phraseBalance = (user, groupId) => {
  let balance = 0
  user.bills
    .filter(bill => bill.groupId === groupId)
    .forEach(bill => {
      if (bill.paid.userId === user.id) {
        balance += bill.paid.amount
      } else {
        balance -= bill.paid.amount / bill.participants.length
      }
    })

  if (balance === 0) {
    return 'is settled up'
  } else if (balance < 0) {
    return `owes ${Math.abs(balance)} ${currency}`
  } else {
    return `gets back ${balance} ${currency}`
  }
}

export default ({ user, groupId }) => (
  <div className={styles.user}>
    <div className={styles.avatar}>
      <img src={getAvatar(user)} />
    </div>
    <div className={styles.content}>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.state}>{phraseBalance(user, groupId)}</div>
    </div>
    <div className={styles['tooltip-wrapper']}>
      <Tooltip user={user} groupId={groupId} />
    </div>
  </div>
)
