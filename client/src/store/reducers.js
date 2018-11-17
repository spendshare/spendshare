import { combineReducers } from 'redux'

const session = (state = {
  token: '',
  name: '',
  email: '',
}, action) => {
  switch (action.type) {
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
