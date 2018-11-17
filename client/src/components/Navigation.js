import React, { Component } from 'react'
import { connect } from 'react-redux'
import { primaryColor } from '../config'
import actions from '../store/actions'
import Button from './Button'
import './Navigation.scss'

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        dupa123
        {/* {name && <div className="signed-in">{name}</div>} */}
      </div>
    )
  }
}

export default connect(
  ({ session }) => ({ session }),
)(Navigation)