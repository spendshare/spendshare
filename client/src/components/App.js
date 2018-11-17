import React from 'react'
import { connect } from 'react-redux'
import './App.scss'
import Navigation from './Navigation'
import Bills from './Bills'
import People from './People'
import Button from './Button'
import { loadScript } from '../GoogleAuth'
import { requestSignIn } from '../store/actions'
import actions from '../store/actions'

loadScript()

const App = ({ session, dispatch }) => (
  <div className="app">
    {session.token
    ? <div>
        <Navigation />
          <Bills />
        <People />
      </div>
    : <div className="center">
        <Button
          title="Sign in with Google"
          onClick={() => dispatch(actions.requestSignIn())}
          light
          loading={session.waiting}
        />
      </div>}
  </div>
)

export default connect(
  ({ session }) => ({ session }),
)(App)