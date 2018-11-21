import React, { useState, useEffect, createRef } from 'react'
import './DropdownSelector.scss'
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
            className="dropdown-selector"
            onClick={handleClick}
        >
            <div className="dropdown-selector-title">{title}</div>
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
        </div>
    )
}
