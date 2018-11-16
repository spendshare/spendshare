import React from 'react'
import './TextSuggestion.scss'
import { optional } from '../utils'

export default ({ text, noHover }) => (
  <div className={`text-suggestion${optional(noHover, 'no-hover')}`}>
    {text}
  </div>
)
