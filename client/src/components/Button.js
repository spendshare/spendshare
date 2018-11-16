import React from 'react'
import './Button.scss'
import { noop, optional } from '../utils'
import { primaryColor, dark } from '../config'

export default ({
  border,
  title,
  loading,
  light,
  onClick,
  ...props,
}) => {
  return (
    <div
      className={`button${optional(loading, 'loading')}${optional(light, 'light')}${optional(border, 'border')}`}
      onClick={loading ? noop : onClick}
      {...props}
    >
      {title}
    </div>
  )
}
