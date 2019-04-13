import React from 'react'
import { connect } from 'react-redux'
import styles from './People.module.scss'
import User from './User'

const People = ({ users }) => (
  <div className={styles.people}>
    {users.list.map(u => (
      <User key={`user-${u.id}`} user={u} />
    ))}
  </div>
)

export default connect(({ users }) => ({ users }))(People)
