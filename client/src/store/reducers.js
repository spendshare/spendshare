import { combineReducers } from 'redux'
import {
  RECEIVE_SIGN_IN,
  REQUEST_SIGN_IN,
  REJECT_SIGN_IN,
} from './actions'

const session = (state = {
  token: null,
  name: null,
  email: null,
  waiting: false,
}, action) => {
  console.log(action.type)
  switch (action.type) {
    case REQUEST_SIGN_IN:
      return { ...state, waiting: true }

    case RECEIVE_SIGN_IN:
      const { token, email, name } = action.session
      console.log(`reducers: ${JSON.stringify(action.session, null, 4)}`)
      return {
        ...state,
        token,
        email,
        name,
        waiting: false,
      }

    case REJECT_SIGN_IN:
      console.log(action.error)
      return {
        ...state,
        waiting: false,
      }
    default:
      return state
  }
}

const users = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

const bills = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  session,
  users,
  bills,
})
