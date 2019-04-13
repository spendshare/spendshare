import React from 'react'
import { getAvatar } from '../utils'
import styles from './MiniBadge.module.scss'

export default ({ user, handleClick }) => (
  <div className={styles['mini-badge']} onClick={handleClick}>
    <div className={styles.avatar}>
      <img src={getAvatar(user)} />
    </div>
    <div className={styles.name}>{user.name}</div>
  </div>
)
