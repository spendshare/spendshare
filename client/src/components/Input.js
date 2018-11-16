import React, { useState } from 'react'
import './Input.scss'
import { fontFamily } from '../config'
import { optional } from '../utils'

export default ({ biggerText, label, right, ...props }) => {
  const [value, setValue] = useState('')
  const handleChange = event => setValue(event.target.value)
  return (
    <div className={`input-wrapper${optional(biggerText, 'bigger')}`}>
      {right && <div className="right">{right}</div>}
      {label && <span className="label">{label}</span>}
      <input
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}
