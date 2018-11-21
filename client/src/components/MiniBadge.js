import React from 'react'
import { getAvatar } from '../utils'
import './MiniBadge.scss'

export default ({ user, handleClick }) => (
    <div className="mini-badge" onClick={handleClick}>
        <div className="avatar">
            <img src={getAvatar(user)} />
        </div>
        <div className="name">{user.name}</div>
    </div>
)
