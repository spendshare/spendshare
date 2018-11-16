import React from 'react'
import './App.scss'
import Navigation from './Navigation'
import Bills from './Bills'
import People from './People'
import Button from './Button'

export default () => (
  <div className="app">
    <Navigation />
    <Bills />
    <People />
  </div>
)
