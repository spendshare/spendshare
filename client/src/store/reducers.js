import { combineReducers } from 'redux'
import { saveToLocalStorage, deleteFromLocalStorage } from '../utils'
import {
  LOAD_LOCAL_STORAGE,
  RECEIVE_SIGN_IN,
  REQUEST_SIGN_IN,
  REJECT_SIGN_IN,
  REQUEST_SIGN_OUT,
  RECEIVE_SIGN_OUT,
  RECEIVE_ALL_USERS,
  RECEIVE_ALL_GROUPS,
  REQUEST_GROUP_MEMBERS,
  RECEIVE_GROUP_MEMBERS,
  REJECT_GROUP_MEMBERS,
  RECEIVE_NEW_GROUP,
  RECEIVE_CURRENT_USER,
  REQUEST_CURRENT_USER,
} from './actions'

const session = (
  state = {
    email: null,
    id: null,
    name: null,
    token: null,
    waiting: false,
  },
  action
) => {
  switch (action.type) {
    case LOAD_LOCAL_STORAGE:
      return {
        ...state,
        ...action.session,
      }

    case REQUEST_SIGN_IN:
      return { ...state, waiting: true }

    case RECEIVE_SIGN_IN:
      // eslint-disable-next-line no-case-declarations
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

    default:
      return state
  }
}

const users = (
  state = {
    list: [],
    currentUser: null,
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_SIGN_OUT:
      return {
        ...state,
        currentUser: null
      }
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      }
    case REQUEST_CURRENT_USER:
      return {
        ...state,
      }
    case RECEIVE_ALL_USERS:
      return { ...state, list: action.users }
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

const groups = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_GROUPS:
      const receivedGroups = {}
      action.groups.forEach(group => {
        receivedGroups[group._id] = group
      })
      return receivedGroups

      case RECEIVE_NEW_GROUP:
          state[action.group._id] = action.group
          return {
            ...state
        }

    case REQUEST_GROUP_MEMBERS:
      state[action.id] = { loading: true }
      return { ...state }

    case RECEIVE_GROUP_MEMBERS:
      state[action.id] = { loading: false, members: action.members }
      return { ...state }

    case REJECT_GROUP_MEMBERS:
      state[action.id] = { loading: false, error: true }
      return { ...state }

    default:
      return state
  }
}

export default combineReducers({
  session,
  users,
  bills,
  groups,
})
