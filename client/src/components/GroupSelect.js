import { useState, useEffect } from 'react'
import styles from './GroupSelect.module.scss'
import Input from './Input'
import Button from './Button'
import connect from 'react-redux/es/connect/connect'
import actions from '../store/actions'
import React from 'react'

function GroupSelect({ createNewGroup, fetchAllGroups, groups }) {
    const [newGroupName, setNewGroupName] = useState('')
    useEffect(fetchAllGroups, [])
    return (
        <div className={styles.center}>
            <div className={styles.createGroup}>
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
                onClick={() => createNewGroup(newGroupName)}
                light
            />
            </div>
            <div>
            {groups.map(({ name }) =>
                <div
                    className={styles.groupLabel}
                    key={`name${name}`}
                >
                    {name}
                </div>
            )}
            </div>
        </div>
    )
}

export default connect(
    ({ groups }) => ({ groups }),
    dispatch => ({
        createNewGroup: name => dispatch(actions.createNewGroup(name)),
        fetchAllGroups: () => dispatch(actions.requestAllGroups()),
    })
)(GroupSelect)
