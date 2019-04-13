import React, { useState } from 'react'
import './BadgeSelector.scss'
import Fuse from 'fuse.js'

import { fontFamily } from '../config'

import MiniBadge from './MiniBadge'
import Suggestion from './Suggestion'
import TextSuggestion from './TextSuggestion'

export default ({ suggested, selected, select, deselect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = event => {
    const input = event.target.value
    setValue(input)
    if (input !== '') {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name'],
  }

  const sizeOfList = 5
  const fuse = new Fuse(suggested, options)
  const filteredSuggestions = fuse
    .search(value)
    .filter(u => !selected.find(e => e.id === u.id))
    .slice(0, sizeOfList)

  return (
    <div className="badge-selector">
      <span className="badge-selector-title">
        With <span className="highlight">you</span> and:
      </span>
      <div className="selected-people">
        {selected.map(s => (
          <MiniBadge
            user={s}
            key={`selected-${s.id}`}
            handleClick={() => deselect(s)}
          />
        ))}
      </div>
      <input
        className="badge-input"
        placeholder="Enter a name..."
        value={value}
        onChange={handleChange}
      />
      {showSuggestions && (
        <div className="suggestions">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(s => (
              <Suggestion
                key={`suggested-${s.id}`}
                user={s}
                onClick={() => {
                  setValue('')
                  setShowSuggestions(false)
                  select(s)
                }}
              />
            ))
          ) : (
            <TextSuggestion text="No results" noHover />
          )}
        </div>
      )}
    </div>
  )
}
