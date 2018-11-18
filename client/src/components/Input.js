import React, { useState } from 'react'
import './Input.scss'
import { fontFamily } from '../config'
import { optionalClass} from '../utils'

export default ({
  biggerText,
  label,
  onChange,
  right,
  value,
  ...props,
}) => {
  return (
    <div className={`input-wrapper${optionalClass(biggerText, 'bigger')}`}>
      {right && <div className="right">{right}</div>}
      {label && <span className="label">{label}</span>}
      <input
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
