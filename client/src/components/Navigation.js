import React, { useState } from 'react'
import { connect } from 'react-redux'
import { primaryColor } from '../config'
import actions from '../store/actions'
import { loadScript } from '../utils'
import './Navigation.scss'
import Button from './Button'

const Navigation = ({ session, dispatch }) => {
  const handleAction = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    const response = await fetch(`http://localhost:3000/api/v1/sign_in`, {
      method: 'POST',
      body: idToken,
    })
    const json = await response.json()
    const { token, name, email } = json
    dispatch(actions.signIn({ token, name, email }))
  }

  const handleError = error => {
    console.error(JSON.stringify(error, undefined, 2))
  }

  const { token, name } = session
  if (!token) loadScript(handleAction, handleError)

  return (
    <div className="navigation">
      <Button
        id="custom-btn"
        light
        title="Sign in with Google"
        // Hack for not unregistering element too fast
        style={name && { display: 'none' }}
      />
      {name && <div className="signed-in">{name}</div>}
    </div>
  )
}

export default connect(
  ({ session }) => ({ session }),
)(Navigation)