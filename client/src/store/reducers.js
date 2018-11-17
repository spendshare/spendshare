import { combineReducers } from 'redux'
import { saveToLocalStorage } from '../utils'
import {
  RECEIVE_SIGN_IN,
  REQUEST_SIGN_IN,
  REJECT_SIGN_IN,
  LOAD_LOCAL_STORAGE,
} from './actions'

const session = (state = {
  email: null,
  name: null,
  token: null,
  waiting: false,
}, action) => {

  console.log(action.type)

  switch (action.type) {
    case LOAD_LOCAL_STORAGE:
      return {
        ...state,
        ...action.session,
      }

    case REQUEST_SIGN_IN:
      return { ...state, waiting: true }

    case RECEIVE_SIGN_IN:
      const { token, email, name } = action.session
      saveToLocalStorage({ token, email, name })
      return {
        ...state,
        email,
        name,
        token,
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
