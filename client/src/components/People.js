import React from 'react'
import { connect } from 'react-redux'
import './People.scss'
import User from './User'

const People = ({ users }) => (
  <div className="people">
    {users.map(u => <User key={`user-${u.id}`} user={u} />)}
  </div>
)

export default connect(({ users }) => ({ users }))(People)
