import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import styles from './App.module.scss'
import Button from './Button'
import actions from '../store/actions'
import GroupSelect from './GroupSelect'
import ShowGroup from './ShowGroup'
import Profile from './Profile'
import CurrentUserHandler from './CurrentUserHandler'
import { BACKEND_URL } from '../utils'

const Index = ({ currentUser }) => {
  return (
    <div className={styles.center}>
      {currentUser && <Redirect to="/groups" />}
      <Button
        light
        onClick={() => {
          window.location.href = `${BACKEND_URL}/auth/google`
        }}
        title="Sign in with Google"
      />
    </div>
  )
}

const EnhancedLogin = connect(({ users: { currentUser } }) => ({
  currentUser,
}))(Index)

const NoContentHere = () => <div>No content here</div>

const App = ({ fetchCurrentUser }) => {
  useEffect(fetchCurrentUser, [])
  return (
    <Router>
      <div className={styles.app}>
        <CurrentUserHandler />
        <Switch>
          <Route path="/" exact component={EnhancedLogin} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/groups" component={GroupSelect} />
          <Route path="/group/:id" component={ShowGroup} />
          <Route path="/" component={NoContentHere} />
        </Switch>
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
