import React, { useEffect, useState } from 'react'
import actions from '../store/actions'
import connect from 'react-redux/es/connect/connect'
import styles from './Profile.module.scss'
import DropdownSelector from './DropdownSelector'
import { getAvatar } from '../utils'
import Button from './Button'
import Spinner from './Spinner'

const mapStateToProps = ({ ignored, users }) => ({ ignored, users })

const mapDispatchToProps = dispatch => ({
  fetchIgnoredUsersByMe: () => dispatch(actions.requestIgnoredUsersByMe()),
  fetchAllUsers: () => dispatch(actions.requestAllUsers()),
  requestIgnoreUser: id => dispatch(actions.requestIgnoreUser(id)),
})

const Profile = ({
  ignored = [],
  users,
  fetchIgnoredUsersByMe,
  fetchAllUsers,
  requestIgnoreUser,
}) => {
  useEffect(() => {
    fetchIgnoredUsersByMe()
    fetchAllUsers()
  }, [])

  if (!users || !users.currentUser || !ignored) {
    return <Spinner />
  }
  return (
    <div>
      <h1>Ignored</h1>
      {Object.values(users.all)
        .filter(user => user.id !== users.currentUser.id)
        .map(user => (
          <div key={user._id} className={styles.user}>
            <div className={styles['badge-section']}>
              <div className={styles.avatar}>
                <img src={getAvatar(user)} />
              </div>
              <span className={styles.name}>{user.name}</span>
            </div>
            {!ignored[user._id] && (
              <Button
                light
                title="Ignore"
                onClick={() => requestIgnoreUser(user._id)}
              />
            )}
          </div>
        ))}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
