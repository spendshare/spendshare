import React from 'react'
import './User.scss'
import { currency } from '../config'
import { getAvatar } from '../utils'
import Tooltip from './Tooltip'

const phraseBalance = balance => {
    if (balance === 0) {
        return 'is settled up'
    } else if (balance < 0) {
        return `owes ${Math.abs(balance)} ${currency}`
    } else {
        return `gets back ${balance} ${currency}`
    }
}

export default ({ user }) => (
    <div className="user">
        <div className="avatar">
            <img src={getAvatar(user)} />
        </div>
        <div className="content">
            <div className="name">{user.name}</div>
            <div className="state">{phraseBalance(user.balance)}</div>
        </div>
        <div className="tooltip-wrapper">
            <Tooltip debts={user.debts} />
        </div>
    </div>
)
