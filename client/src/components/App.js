import React, { useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.scss'
import Navigation from './Navigation'
import Bills from './Bills'
import People from './People'
import Button from './Button'
import actions from '../store/actions'
import Input from './Input'

function Index() {
  return (
    <div className="center">
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

function GroupSelect({ createNewGroup }) {
  const [newGroupName, setNewGroupName] = useState('')
  return (
    <div className="center">
      <Input
        autoFocus
        className="input"
        label="Create new group"
        onChange={({ target: { value } }) => setNewGroupName(value)}
        placeholder="Enter a name..."
        value={newGroupName}
      />
      <Button
        title="Create"
        onClick={() => createNewGroup(newGroupName)}
        light
      />
    </div>
  )
}

const EnhancedGroupSelect = connect(
  ({ session }) => ({ session }),
  dispatch => ({
    createNewGroup: name => dispatch(actions.createNewGroup(name)),
  })
)(GroupSelect)

const App = ({ session, signIn, fetchUsers }) => {
  return (
    <Router>
      <div className="app">
        {/*{session.id
                ? <div className="wrapper">
                    <Navigation/>
                    <Bills/>
                    <People/>
                </div>
                : <div className="center">
                    <Button
                        light
                        loading={session.waiting}
                        onClick={signIn}
                        title="Sign in with Google"
                    />
                </div>}*/}

        <Route path="/" exact component={Index} />
        <Route path="/login" component={EnhancedGroupSelect} />
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
