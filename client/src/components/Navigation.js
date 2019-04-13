import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Button from './Button'
import styles from './Navigation.module.scss'
import { getAvatar } from '../utils'

const Navigation = ({ session, dispatch }) => (
  <div className={styles.navigation}>
    <img className={styles.avatar} src={getAvatar(session)} />
    <div className={styles.right}>
      {session.name}
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

export default connect(({ session }) => ({ session }))(Navigation)
