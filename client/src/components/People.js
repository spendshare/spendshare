import React from 'react'
import { connect } from 'react-redux'
import styles from './People.module.scss'
import User from './User'
import { getGroupUsers } from '../store/selectors'

const mapStateToProps = (state, props) => ({
  users: getGroupUsers(state, props.groupId),
  debts: state.groupsDebts[props.groupId],
})

const People = ({ users, groupId, faded, debts = {} }) => (
  <div className={`${styles.people}${faded ? ` ${styles.faded}` : ''}`}>
    {users.map(u => (
      <User key={u._id} groupId={groupId} debts={debts[u._id]} user={u} />
    ))}
  </div>
)

export default connect(mapStateToProps)(People)
