import React from 'react'
import styles from './Suggestion.module.scss'
import { getAvatar } from '../utils'

export default ({ user, onClick }) => (
  <div className={styles.suggestion} onClick={onClick}>
    <div className={styles.avatar}>
      <img src={getAvatar(user)} />
    </div>
    <span className={styles.name}>{user.name}</span>
  </div>
)
