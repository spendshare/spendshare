import React, { useState } from 'react'
import styles from './BadgeSelector.module.scss'
import Fuse from 'fuse.js'

import MiniBadge from './MiniBadge'
import Suggestion from './Suggestion'
import TextSuggestion from './TextSuggestion'

const BadgeSelector = ({ suggested, selected, select, deselect }) => {
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
    <div className={styles['badge-selector']}>
      <span className={styles['badge-selector-title']}>
        With <span className={styles.highlight}>you</span> and:
      </span>
      <div className={styles['selected-people']}>
        {selected.map(s => (
          <MiniBadge user={s} key={s.id} handleClick={() => deselect(s)} />
        ))}
      </div>
      <input
        className={styles['badge-input']}
        placeholder="Enter a name..."
        value={value}
        onChange={handleChange}
      />
      {showSuggestions && (
        <div className={styles.suggestions}>
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(s => (
              <Suggestion
                key={s.id}
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

export default BadgeSelector
