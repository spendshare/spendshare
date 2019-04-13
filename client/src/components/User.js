import React from 'react'
import styles from './User.module.scss'
import { currency } from '../config'
import { getAvatar } from '../utils'
import Tooltip from './Tooltip'

const phraseBalance = balance => {
  if (balance === 0) {
    return 'is settled up'
  } else if (balance < 0) {
    return `owes ${Math.abs(balance)} ${currency}`
  } else {
    return `gets back ${balance} ${currency}`
  }
}

export default ({ user }) => (
  <div className={styles.user}>
    <div className={styles.avatar}>
      <img src={getAvatar(user)} />
    </div>
    <div className={styles.content}>
      <div className={styles.name}>{user.name}</div>
      <div className={styles.state}>{phraseBalance(user.balance)}</div>
    </div>
    <div className={styles['tooltip-wrapper']}>
      <Tooltip debts={user.debts} />
    </div>
  </div>
)
