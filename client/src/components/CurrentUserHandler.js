import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Button from './Button'
import styles from './CurrentUserHandler.module.scss'
import { getAvatar } from '../utils'

const CurrentUserHandler = ({ currentUser, dispatch }) => {
  return (
    <div className={styles.navigation}>
      <div className={styles.right}>
        {currentUser}
        <br/>
        {currentUser &&
          <div
            className={styles['sign-out']}
            onClick={() => dispatch(actions.requestSignOut())}
          >
            Sign out
          </div>
        }
      </div>
    </div>
  )
}

export default connect(({ users: { currentUser } }) => ({ currentUser }))(CurrentUserHandler)
