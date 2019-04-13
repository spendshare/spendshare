import React from 'react'
import { connect } from 'react-redux'
import actions from '../store/actions'
import Button from './Button'
import './Navigation.scss'
import { getAvatar } from '../utils'

const Navigation = ({ session, dispatch }) => (
  <div className="navigation">
    <img className="avatar" src={getAvatar(session)} />
    <div className="right">
      {session.name}
      <br />
      <div
        className="sign-out"
        onClick={() => dispatch(actions.requestSignOut())}
      >
        Sign out
      </div>
    </div>
  </div>
)

export default connect(({ session }) => ({ session }))(Navigation)
