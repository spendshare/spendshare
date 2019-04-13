import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './Input.module.scss'

export default ({ biggerText, label, onChange, right, value, ...props }) => {
  return (
    <div
      className={classNames(
        styles['input-wrapper'],
        biggerText && styles.bigger
      )}
    >
      {right && <div className={styles.right}>{right}</div>}
      {label && <span className={styles.label}>{label}</span>}
      <input value={value} onChange={onChange} {...props} />
    </div>
  )
}
