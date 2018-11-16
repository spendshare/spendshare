import React from 'react'
import './App.scss'
import Navigation from './Navigation'
import Bills from './Bills'
import People from './People'

export default () => (
  <div className="app">
    <Navigation />
    <Bills />
    <People />
  </div>
)
