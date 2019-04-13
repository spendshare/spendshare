import api from '../api'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import actions, {
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_ADD_BILL,
  REQUEST_ALL_USERS,
  CREATE_NEW_GROUP,
  REQUEST_ALL_GROUPS,
  REQUEST_GROUP_MEMBERS,
  REQUEST_CURRENT_USER,
} from './actions'
import { callSignIn } from '../GoogleAuth'
import { getLocalStorage } from '../utils'

function redirectToMainPageIfNeeded() {
  if (window.location.href !== 'http://localhost:8000/') {
    window.location.href = 'http://localhost:8000/'
  }
}

function* loadLocalStorage() {
  const session = getLocalStorage('token', 'email', 'id', 'name')
  yield put(actions.loadLocalStorage(session))
}

function* processSignIn() {
  const googleResponse = yield call(callSignIn)
  const response = yield call(
    api.fetch,
    api.endpoints.signIn(googleResponse.Zi.id_token)
  )

  if (response && !response.error) {
    yield put(actions.receiveSignIn(response.data))
  } else {
    yield put(actions.rejectSignIn(response.error))
  }
}

function* processSignOut() {
  const response = yield call(api.fetch, api.endpoints.signOut)
  if (response.error) console.error(response.error)
  yield put(actions.receiveSignOut())
  redirectToMainPageIfNeeded()
}

function* processAddBill(action) {
  const bill = yield call(api.fetch, api.endpoints.addBill(action.params))
  if (bill && !bill.error) {
    yield put(actions.receiveAddBill(bill))
  } else {
    yield put(actions.rejectAddBill())
  }
}

function* fetchAllUsers() {
  const users = yield call(api.fetch, api.endpoints.allUsers)
  if (users && !users.error) {
    // FIXME
    yield put(
      actions.receiveAllUsers(users.data.map(u => ({ ...u, balance: 0 })))
    )
  } else {
    yield put(actions.rejectAllUsers)
  }
}

function* fetchAllGroups() {
  const groups = yield call(api.fetch, api.endpoints.allGroups)
  if (groups && !groups.error) {
    yield put(actions.receiveAllGroups(groups))
  } else {
    yield put(actions.rejectAllGroups())
  }
}

function* createNewGroup({ name }) {
  const group = yield call(api.fetch, api.endpoints.createGroup({ name }))
  if (group && !group.error) {
     yield put(actions.receiveNewGroup(group.group))
  } else {
    //yield put(actions.rejectAllUsers)
  }
}

function* fetchGroupMembers({ id }) {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.fetchGroupMembers(id)
  )
  if (!error) {
    yield put(actions.receiveGroupMembers(id, data))
  } else {
    yield put(actions.rejectGroupMembers(id, error))
  }
}

function* fetchCurrentUser() {
  const data = yield call(
    api.fetch,
    api.endpoints.fetchCurrentUser()
  )
  if (data && !data.error) {
    yield put(actions.receiveCurrentUser(data.user))
  } else {
    redirectToMainPageIfNeeded()
  }
}

export default function*() {
  yield fork(loadLocalStorage)
  yield takeEvery(REQUEST_SIGN_IN, processSignIn)
  yield takeEvery(REQUEST_SIGN_OUT, processSignOut)
  yield takeEvery(REQUEST_ADD_BILL, processAddBill)
  yield takeEvery(REQUEST_GROUP_MEMBERS, fetchGroupMembers)
  yield takeEvery(REQUEST_ALL_USERS, fetchAllUsers)
  yield takeEvery(REQUEST_ALL_GROUPS, fetchAllGroups)
  yield takeEvery(CREATE_NEW_GROUP, createNewGroup)
  yield takeEvery(REQUEST_CURRENT_USER, fetchCurrentUser)
}
