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
  RECEIVE_MY_GROUPS,
  REQUEST_GROUP_DEBTS,
  REQUEST_GROUP_MEMBERS,
  RECEIVE_GROUP_MEMBERS,
  REJECT_GROUP_MEMBERS,
  RECEIVE_NEW_GROUP,
  RECEIVE_CURRENT_USER,
  REQUEST_CURRENT_USER,
  RECEIVE_USER,
  RECEIVE_SIGN_UP_TO_GROUP,
  RECEIVE_GROUP_BILLS,
  RECEIVE_ADD_BILL,
  RECEIVE_GROUP_DEBTS,
  REQUEST_IGNORE_USER,
  RECEIVE_IGNORE_USER,
  REJECT_IGNORE_USER,
  REQUEST_IGNORED_USERS_BY_ME,
  REJECT_IGNORED_USERS_BY_ME,
  RECEIVE_IGNORED_USERS_BY_ME,
  REQUEST_ADD_BILL,
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
    all: {},
    currentUser: null,
    myGroups: [],
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      }

    case RECEIVE_USER:
      action.user.id = action.user._id
      state.all[action.user._id] = action.user
      return {
        ...state,
      }

    case RECEIVE_CURRENT_USER:
      action.user.id = action.user._id
      return {
        ...state,
        myGroups: action.groups,
        currentUser: action.user,
      }

    case RECEIVE_SIGN_UP_TO_GROUP:
      return {
        ...state,
        myGroups: [...state.myGroups, action.data._id],
      }

    case REQUEST_CURRENT_USER:
      return {
        ...state,
      }

    case RECEIVE_ALL_USERS:
      const all = {}
      action.users.forEach(user => (all[user._id] = user))
      return { ...state, all }

    default:
      return state
  }
}

const ignored = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_IGNORE_USER:
      return { ...state }

    case RECEIVE_IGNORE_USER:
      const { id } = action
      state[id] = true
      return { ...state }

    case REJECT_IGNORE_USER:
      return { ...state }

    case REQUEST_IGNORED_USERS_BY_ME:
      return { ...state }

    case RECEIVE_IGNORED_USERS_BY_ME:
      state = {}
      action.ignored.forEach(ignored => {
        state[ignored.secondUserId] = true
      })
      return { ...state }

    case REJECT_IGNORED_USERS_BY_ME:
      return { ...state }

    default:
      return state
  }
}

const members = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_GROUP_MEMBERS:
      if (action.members.length === 0) return state
      return state
        .filter(existing => existing.groupId !== action.members[0].groupId)
        .concat(action.members)

    default:
      return state
  }
}

const bills = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GROUP_BILLS:
      action.bills.forEach(bill => {
        bill.id = bill._id
        state[bill._id] = bill
      })
      return { ...state }

    case RECEIVE_ADD_BILL:
      action.bill.id = action.bill._id
      return { [action.bill.id]: action.bill, ...state }
    default:
      return state
  }
}

const groups = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MY_GROUPS:
      const receivedGroups = {}
      action.groups.filter(Boolean).forEach(group => {
        receivedGroups[group._id] = group
      })
      return receivedGroups

    case RECEIVE_NEW_GROUP:
      state[action.group._id] = action.group
      return {
        ...state,
      }

    case REQUEST_GROUP_DEBTS:
      state[action.id].fetching = true
        return {
          ...state
        }

      case REQUEST_ADD_BILL:
      state[action.params.groupId].fetching = true
      return {
        ...state
      }

    case RECEIVE_GROUP_DEBTS:
      state[action.groupId].fetching = false

      return {
        ...state
      }

    case RECEIVE_SIGN_UP_TO_GROUP:
      state[action.data._id] = action.data
      return { ...state }

    case REQUEST_GROUP_MEMBERS:
      if (state[action.id]) {
        state[action.id].loading = true
      } else {
        state[action.id] = { loading: true }
      }
      return { ...state }

    case RECEIVE_GROUP_MEMBERS:
      if (state[action.id]) {
        state[action.id].loading = false
      } else {
        state[action.id] = { loading: false }
      }
      return { ...state }

    case REJECT_GROUP_MEMBERS:
      if (state[action.id]) {
        state[action.id].loading = false
        state[action.id].error = true
      } else {
        state[action.id] = { loading: false, error: true }
      }
      return { ...state }

    default:
      return state
  }
}

const groupsDebts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_GROUP_DEBTS:
      return {
        ...state,
        [action.groupId]: action.debts,
      }

    default:
      return state
  }
}

export default combineReducers({
  session,
  users,
  ignored,
  bills,
  members,
  groups,
  groupsDebts,
})
