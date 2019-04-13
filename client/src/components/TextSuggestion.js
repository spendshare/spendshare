import React from 'react'
import styles from './TextSuggestion.module.scss'
import classNames from 'classnames'

export default ({ text, noHover }) => (
  <div
    className={classNames(
      styles['text-suggestion'],
      noHover && styles['no-hover']
    )}
  >
    {text}
  </div>
)
