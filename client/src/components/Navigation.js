import React, { useState } from 'react'
import { primaryColor } from '../config'
import { loadScript } from '../utils'
import './Navigation.scss'
import Button from './Button'

export default () => {
  const [name, setName] = useState(null)

  loadScript(
    googleUser => {
      setName(googleUser.getBasicProfile().getName())
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
