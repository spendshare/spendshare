import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actions from '../store/actions'
import styles from './CurrentUserHandler.module.scss'
import { getAvatar } from '../utils'

const CurrentUserHandler = ({ currentUser, dispatch }) => {
  if (!currentUser) return null
  return (
    <div className={styles.navigation}>
      <div className={styles.links}>
        <Link className={styles['menu-link']} to="/">
          Homepage
        </Link>
        <Link className={styles['menu-link']} to="/profile">
          Ignored
        </Link>
      </div>
      <div className={styles.avatar}>
        <img src={getAvatar(currentUser)} />
      </div>
      <div className={styles.right}>
        <Link to={'/profile'} className={styles.link}>
          {currentUser.name}
        </Link>
        <br />
        <div
          className={styles['sign-out']}
          onClick={() => dispatch(actions.requestSignOut())}
        >
          Sign out
        </div>
      </div>
    </div>
  )
}

export default connect(({ users: { currentUser } }) => ({ currentUser }))(
  CurrentUserHandler
)
