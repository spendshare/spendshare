import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from './App.module.scss'
import Button from './Button'
import actions from '../store/actions'
import GroupSelect from './GroupSelect'

function Index() {
  return (
    <div className={styles.center}>
      <Button
        light
        onClick={() =>
          (window.location.href = 'http://localhost:3000/auth/google')
        } // TODO
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
