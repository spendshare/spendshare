import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import styles from './App.module.scss'
import Button from './Button'
import actions from '../store/actions'
import GroupSelect from './GroupSelect'
import ShowGroup from './ShowGroup'
import CurrentUserHandler from './CurrentUserHandler'

const Index = ({ currentUser }) => {
  return (
    <div className={styles.center}>
      {currentUser  && <Redirect to="/login"/>}
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

const EnhancedLogin = connect(
  ({ users: { currentUser } }) => ({ currentUser }),
)(Index)

const App = ({ fetchCurrentUser }) => {
  useEffect(fetchCurrentUser, [])
  return (
    <Router>
      <div className={styles.app}>
        <CurrentUserHandler />
        <Route path="/" exact component={EnhancedLogin} />
        <Route path="/groups" component={GroupSelect} />
        <Route path="/group/:id" component={ShowGroup} />
      </div>
    </Router>
  )
}

export default connect(
  ({ users: { currentUser } }) => ({ currentUser }),
  dispatch => ({
    fetchCurrentUser: () => dispatch(actions.requestCurrentUser()),
  })
)(App)
