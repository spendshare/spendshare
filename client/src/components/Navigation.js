import React, { Component } from 'react'
import { connect } from 'react-redux'
import { primaryColor } from '../config'
import actions from '../store/actions'
import Button from './Button'
import './Navigation.scss'

const Navigation = ({ session: { name } }) => (
  <div className="navigation">
    {name}
  </div>
)

export default connect(
  ({ session }) => ({ session }),
)(Navigation)