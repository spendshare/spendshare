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
  fetchAllGroups: () => dispatch(actions.requestAllGroups()),
  signUpToGroup: groupId => dispatch(actions.requestSignUpToGroup(groupId)),
})

function GroupSelect({
  createNewGroup,
  fetchAllGroups,
  groups,
  myGroups,
  signUpToGroup,
}) {
  const [newGroupName, setNewGroupName] = useState('')
  useEffect(fetchAllGroups, [])

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
