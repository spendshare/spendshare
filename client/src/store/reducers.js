import { combineReducers } from 'redux'
import {
  saveToLocalStorage,
  deleteFromLocalStorage,
} from '../utils'
import {
  LOAD_LOCAL_STORAGE,
  RECEIVE_SIGN_IN,
  REQUEST_SIGN_IN,
  REJECT_SIGN_IN,
  REQUEST_SIGN_OUT,
  RECEIVE_SIGN_OUT,
} from './actions'

const mockUsers = [{
  balance: -120,
  email: 'tomek.czajecki@gmail.com',
  id: 100,
  name: 'Tomek Czajęcki',
}, {
  balance: 0,
  email: 'supesetle@gmail.com',
  id: 50,
  name: 'Michał Osadnik',
}, {
  balance: 20,
  email: 'mikucki@gmail.com',
  id: 51,
  name: 'Aleksander Mikucki',
}, {
  balance: -500,
  email: 'tomasz.sapeta@gmail.com',
  id: 1,
  name: 'Tomasz Sapeta',
}, {
  balance: 57,
  email: 'kswierad@gmail.com',
  id: 2,
  name: 'Kamil Świerad',
}]

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
      return {
        ...state,
        waiting: false,
      }

    case REQUEST_SIGN_OUT:
      return { ...state }

    case RECEIVE_SIGN_OUT:
      deleteFromLocalStorage('token', 'email', 'name')
      return {
        ...state,
        email: null,
        name: null,
        token: null,
      }

    default:
      return state
  }
}

const users = (state = mockUsers, action) => {
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
