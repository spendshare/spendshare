import React from 'react'
import './TextSuggestion.scss'
import { optionalClass } from '../utils'

export default ({ text, noHover }) => (
  <div className={`text-suggestion${optionalClass(noHover, 'no-hover')}`}>
    {text}
  </div>
)
