import { useState, useEffect, createRef } from 'react'
import Fuse from 'fuse.js'

import { fontFamily } from '../config'
import TextSuggestion from './TextSuggestion'

export default ({
  options,
  renderOption,
  select,
  searchKeys,
  title,
}) => {
  options = options || []
  const [showDropdown, setShowDropdown] = useState(false)
  const [value, setValue] = useState('')
  let ref = createRef()

  useEffect(() => {
    const handleClick = event => {
      const wasClickOutside = showDropdown && ref && !ref.contains(event.target)
      if (wasClickOutside) {
        setShowDropdown(false)
        setValue('')
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  })

  const handleClick = () => {
    if (!showDropdown) setShowDropdown(true)
  }

  const handleChange = event => setValue(event.target.value)

  const config = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: searchKeys,
  }

  const fuse = new Fuse(options, config)
  const filteredOptions = fuse.search(value)

  const prepareOptions = list => list.map(o => (
    <div
      key={`${o.id}`}
      onClick={() => {
        setShowDropdown(false)
        setValue('')
        select(o)
      }}
    >
      {renderOption(o)}
    </div>
  ))

  const renderOptions = () => {
    const list = value === '' ? options : filteredOptions
    if (list.length === 0) return <TextSuggestion text="No results" noHover />
    return prepareOptions(list)
  }

  return (
    <div
      className="selector"
      onClick={handleClick}
    >
      <div className="title">{title}</div>
      {showDropdown && (
        <div className="dropdown" ref={node => {ref = node}}>
          <input
            autoFocus
            onChange={handleChange}
            placeholder="Enter a name..."
            value={value}
          />
          <div className="options">
            {renderOptions()}
          </div>
        </div>
      )}
      <style jsx>{`
        .selector {
          position: relative;
          cursor: pointer;
          border-radius: 5px;
          height: 20px;
          margin: 0 5px;
          padding: 6px 10px;
          color: #000;
          background-color: #eee;
        }

        .selector:hover {
          background-color: #ddd;
        }

        .title {
          max-width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        input {
          font-family: ${fontFamily}, sans-serif;
          font-size: 15px;
          border: none;
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
        }

        input:focus {
          outline: none;
        }

        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: #888;
          opacity: 1; /* Firefox */
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #888;
        }

        ::-ms-input-placeholder { /* Microsoft Edge */
            color: #888;
        }

        .dropdown {
          overflow: hidden;
          position: absolute;
          left: -220px;
          top: 0;
          width: 210px;
          background-color: #fff;
          border-radius: 5px;
          z-index: 3;
          // border: 1px solid #eee;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }

        .options {
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  )
}
