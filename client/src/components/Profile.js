import React, { useEffect, useState } from 'react'
import actions from '../store/actions'
import connect from 'react-redux/es/connect/connect'
import styles from './Profile.module.scss'
import { getAvatar } from '../utils'
import Button from './Button'
import Spinner from './Spinner'

const mapStateToProps = ({ ignored, users, groups, members }) => ({
  ignored,
  users,
  groups,
  members,
})

const mapDispatchToProps = dispatch => ({
  fetchIgnoredPage: () => dispatch(actions.requestIgnoredPage()),
  requestIgnoreUser: id => dispatch(actions.requestIgnoreUser(id)),
})

const Profile = ({
  ignored,
  requestIgnoreUser,
  fetchIgnoredPage,
  users,
  groups,
  members,
}) => {
  useEffect(() => {
    fetchIgnoredPage()
  }, [])

  if (!users || !users.currentUser || !ignored || !groups || !members) {
    return <Spinner />
  }

  const data = Object.values(groups)
    .flatMap(group =>
      members
        .filter(member => member.groupId === group._id)
        .map(member => {
          const user = users.all[member.userId]
          return {
            _id: user._id,
            name: user.name,
            ignored: !!ignored[member.userId],
          }
        })
    )
    .filter(user => user._id !== users.currentUser._id)

  return (
    <div>
      <h1>Ignored</h1>
      {data.map(user => (
        <div key={user._id} className={styles.user}>
          <div className={styles['badge-section']}>
            <div className={styles.avatar}>
              <img src={getAvatar(user)} />
            </div>
            <span className={styles.name}>{user.name}</span>
          </div>
          {!user.ignored && (
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
