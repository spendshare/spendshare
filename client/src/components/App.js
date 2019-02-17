import React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import Navigation from './Navigation'
import Bills from './Bills'
import People from './People'
import Button from './Button'
import { loadScript } from '../GoogleAuth'
import actions from '../store/actions'

loadScript()

const App = ({ session, signIn }) =>
  <div className="app">
    {session.id
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
      </div>}
  </div>

export default connect(
  ({ session }) => ({ session }),
  dispatch => ({
    signIn: () => dispatch(actions.requestSignIn()),
  })
)(App)