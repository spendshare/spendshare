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
      // console.log(json)
      setName(json.name)
    },
    error => {
      console.error(JSON.stringify(error, undefined, 2))
    },
  )

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
