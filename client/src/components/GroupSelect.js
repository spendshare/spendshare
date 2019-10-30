import { useState, useEffect } from 'react'
import styles from './GroupSelect.module.scss'
import Input from './Input'
import Button from './Button'
import connect from 'react-redux/es/connect/connect'
import actions from '../store/actions'
import React from 'react'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ groups, users: { myGroups } }) => ({
  groups,
  myGroups,
})

const mapDispatchToProps = dispatch => ({
  createNewGroup: name => dispatch(actions.createNewGroup(name)),
  fetchMyGroups: () => dispatch(actions.requestMyGroups()),
  signUpToGroup: (groupName, groupPassword) => {
    if (groupName !== groupPassword.split('').reverse().join('')) {
      alert('Wrong password!')
    }
    dispatch(actions.requestSignUpToGroup(groupName))
  },
})

function GroupSelect({
  createNewGroup,
  fetchMyGroups,
  groups,
  myGroups,
  signUpToGroup,
}) {
  const [newGroupName, setNewGroupName] = useState('')
  const [joinGroupName, setJoinGroupName] = useState('')
  const [joinGroupPassword, setJoinGroupPassword] = useState('')
  useEffect(fetchMyGroups, [])

  return (
    <div className={styles.center}>
      <div className={styles['create-group']}>
        <Input
            autoFocus
            className={styles.input}
            label="Create new group"
            onChange={({ target: { value } }) => setNewGroupName(value)}
            placeholder="Enter a name..."
            value={newGroupName}
        />
        <Button
            title="Create"
            className={styles.button}
            onClick={() => createNewGroup(newGroupName)}
            light
        />
      </div>
      <div className={styles['create-group']}>
        <Input
            className={styles.input}
            label="Join group"
            onChange={({ target: { value } }) => setJoinGroupName(value)}
            placeholder="Enter a name..."
            value={joinGroupName}
        />
        <Input
            className={styles.input}
            label="password"
            onChange={({ target: { value } }) => setJoinGroupPassword(value)}
            placeholder="Enter a password..."
            value={joinGroupPassword}
        />
        <Button
            title="Join"
            className={styles.button}
            onClick={() => signUpToGroup(joinGroupName, joinGroupPassword)}
            light
        />
      </div>
      <div className={styles['groups-box']}>
        {Object.values(groups)
          .reverse()
          .map(({ name, _id }) => (
            <div className={styles['group-label']} key={`id${_id}`}>
              <div className={styles['group-name']}>{name}</div>
              {myGroups.includes(_id) ? (
                <Link className={styles['join-link']} to={`/group/${_id}`}>
                  Get in
                </Link>
              ) : (
                <Button
                  onClick={() => signUpToGroup(_id)}
                  light
                  title="Sign for group"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelect)
