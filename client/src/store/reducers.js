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
  id: 'VXNlcjox',
  name: 'Tomek Czajęcki',
}, {
  balance: 0,
  email: 'supesetle@gmail.com',
  id: 'VXNlcjoy',
  name: 'Michał Osadnik',
}, {
  balance: 20,
  email: 'mikucki@gmail.com',
  id: 'VXNlcjoz',
  name: 'Aleksander Mikucki',
}, {
  balance: -500,
  email: 'tomasz.sapeta@gmail.com',
  id: 'VXNlcjo0',
  name: 'Tomasz Sapeta',
}, {
  balance: 57,
  email: 'kswierad@gmail.com',
  id: 'VXNlcjo1',
  name: 'Kamil Świerad',
}]

const session = (state = {
  email: null,
  id: null,
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
      const { email, id, name, token } = action.session
      saveToLocalStorage({ email, id, name, token })
      return {
        ...state,
        email,
        id,
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
      deleteFromLocalStorage('token', 'id', 'email', 'name')
      return {
        ...state,
        email: null,
        id: null,
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
