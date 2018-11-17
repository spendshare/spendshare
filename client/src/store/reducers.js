import { combineReducers } from 'redux'
import { SIGN_IN } from './actions';

const session = (state = {
  token: null,
  name: null,
  email: null,
}, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { token, email, name } = action.session
      return {
        ...state,
        token,
        email,
        name,
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
