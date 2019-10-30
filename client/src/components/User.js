import React from 'react'
import styles from './User.module.scss'
import { currency } from '../config'
import { getAvatar } from '../utils'
import Tooltip from './Tooltip'

const phraseBalance = (user, debts) => {
  let balance = 0
  debts.forEach(d => (balance += d.amount))

  if (balance === 0) {
    return 'is settled up'
  } else if (balance < 0) {
    return `owes ${Math.abs(balance.toFixed(2))} ${currency}`
  } else {
    return `gets back ${balance.toFixed(2)} ${currency}`
  }
}

export default ({ user, groupId, debts }) => (
  <div className={styles.user}>
    <div className={styles.avatar}>
      <img src={getAvatar(user)} />
    </div>
    <div className={styles.content}>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.state}>{phraseBalance(user, debts || [])}</div>
    </div>
    <div className={styles['tooltip-wrapper']}>
      <Tooltip user={user} debts={debts} groupId={groupId} />
    </div>
  </div>
)
