import React from 'react'
import './Suggestion.scss'
import { getAvatar } from '../utils'

export default ({ user, onClick }) => (
  <div
    className="suggestion"
    onClick={onClick}
  >
    <div className="avatar">
      <img src={getAvatar(user)} />
    </div>
    <span className="name">{user.name}</span>
  </div>
)
