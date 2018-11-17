import React, { useState } from 'react'
import { primaryColor } from '../config'
import { loadScript, saveToLocalStorage } from '../utils'
import './Navigation.scss'
import Button from './Button'

export default () => {
  const [name, setName] = useState(localStorage.getItem('name'))

  const signIn = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    const response = await fetch(`http://localhost:3000/api/v1/sign_in`, {
      method: 'POST',
      body: idToken,
    })
    const json = await response.json()

    const { token, name, email } = json
    setName(name)
    saveToLocalStorage({ token, name, email })
  }

  const handleError = error => {
    console.error(JSON.stringify(error, undefined, 2))
  }

  const token = localStorage.getItem('token')
  if (!token) loadScript(signIn, handleError)

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
