import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'
import { noop } from '../utils'

export default ({ border, title, loading, light, onClick, ...props }) => {
  return (
    <div
      className={classNames(
        styles.button,
        loading && styles.loading,
        light && styles.light,
        border && styles.border
      )}
      onClick={loading ? noop : onClick}
      {...props}
    >
      {loading ? '...' : title}
    </div>
  )
}
