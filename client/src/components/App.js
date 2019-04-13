import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styles from './App.module.scss'
import Button from './Button'
import actions from '../store/actions'
import GroupSelect from './GroupSelect'
import ShowGroup from './ShowGroup'

function Index() {
  return (
    <div className={styles.center}>
      <Button
        light
        onClick={() => {
          window.location.href = 'http://localhost:3000/auth/google'
        }}
        title="Sign in with Google"
      />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Route path="/" exact component={Index} />
        <Route path="/login" component={GroupSelect} />
        <Route path="/group/:id" component={ShowGroup} />
      </div>
    </Router>
  )
}

export default connect(
  ({ session }) => ({ session }),
  dispatch => ({
    signIn: () => dispatch(actions.requestSignIn()),
    fetchUsers: () => dispatch(actions.requestAllUsers()),
  })
)(App)
