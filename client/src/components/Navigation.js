import React, { useState } from 'react'
import { primaryColor } from '../config'
import { loadScript } from '../utils'
import './Navigation.scss'
import Button from './Button'

export default () => {
  const [name, setName] = useState(null)

  loadScript(
    async googleUser => {
      const token = googleUser.getAuthResponse().id_token
      const response = await fetch(`http://localhost:3000/api/v1/sign_in`, {
        method: 'POST',
        body: token,
      })
      const json = await response.json()
      console.log(json)

      // setName(googleUser.getBasicProfile().getName())
    },
    error => {
      console.error(JSON.stringify(error, undefined, 2))
    },
  )

  return (
    <div className="navigation">
      {name || <Button title="Sign in with Google" id="custom-btn" light />}
    </div>
  )
}
