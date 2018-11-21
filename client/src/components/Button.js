import React from 'react'
import './Button.scss'
import { noop, optionalClass } from '../utils'

export default ({
    border,
    title,
    loading,
    light,
    onClick,
    ...props
}) => {
    return (
        <div
            className={`button${optionalClass(loading, 'loading')}${optionalClass(light, 'light')}${optionalClass(border, 'border')}`}
            onClick={loading ? noop : onClick}
            {...props}
        >
            {loading ? '...' : title}
        </div>
    )
}
