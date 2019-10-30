import api from '../api'
import { call, fork, put, takeEvery, select, delay } from 'redux-saga/effects'
import actions, {
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_ADD_BILL,
  REQUEST_ALL_USERS,
  CREATE_NEW_GROUP,
  REQUEST_MY_GROUPS,
  REQUEST_GROUP_MEMBERS,
  REQUEST_CURRENT_USER,
  REQUEST_GROUP_DEBTS,
  REQUEST_SIGN_UP_TO_GROUP,
  REQUEST_GROUP_BILLS,
  REQUEST_IGNORED_USERS_BY_ME,
  REQUEST_IGNORE_USER,
} from './actions'
import { callSignIn } from '../GoogleAuth'
import { selectSession } from './selectors'
import { getLocalStorage, FRONTEND_URL } from '../utils'

function redirectToMainPageIfNeeded() {
  if (!new RegExp(`^${FRONTEND_URL}/?$`).test(window.location.href)) {
    window.location.href = FRONTEND_URL
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
  const response = yield call(api.fetch, api.endpoints.signOut())
  if (response.error) console.error(response.error)
  yield put(actions.receiveSignOut())
  redirectToMainPageIfNeeded()
}

function* processAddBill(action) {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.addBill(action.params)
  )
  if (!error) {
    yield put(actions.receiveAddBill(data))
  } else {
    yield put(actions.rejectAddBill(error))
  }
}

function* fetchAllUsers() {
  const { data, error } = yield call(api.fetch, api.endpoints.allUsers())
  if (!error) {
    yield put(actions.receiveAllUsers(data))
  } else {
    yield put(actions.rejectAllUsers(error))
  }
}

function* fetchUser(id) {
  const { data, error } = yield call(api.fetch, api.endpoints.fetchUser(id))
  if (!error) {
    yield put(actions.receiveUser(data))
  } else {
    yield put(actions.rejectUser(error))
  }
}

function* fetchMyGroups() {
  const { data, error } = yield call(api.fetch, api.endpoints.myGroups())
  if (!error) {
    yield put(actions.receiveMyGroups(data))
  } else {
    yield put(actions.rejectMyGroups(error))
  }
}

function* fetchIgnoredUsersByMe() {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.fetchIgnoredUsersByMe()
  )
  if (!error) {
    yield put(actions.receiveIgnoredUsersByMe(data))
  } else {
    yield put(actions.rejectIgnoredUsersByMe(error))
  }
}

function* ignoreUser({ id }) {
  const { error } = yield call(api.fetch, api.endpoints.addToIgnored(id))
  if (!error) {
    yield put(actions.receiveIgnoreUser(id))
  } else {
    yield put(actions.rejectIgnoreUser(id))
  }
}

function* createNewGroup({ name }) {
  const newGroup = yield call(api.fetch, api.endpoints.createGroup({ name }))
  if (newGroup.error) {
    yield put(actions.rejectNewGroup(newGroup.data))
    return
  }

  yield put(actions.receiveNewGroup({ group: newGroup.data }))

  const data = yield call(
    api.fetch,
    api.endpoints.fetchSignUpToGroup(newGroup.data.name)
  )

  if (data && !data.error) {
    yield put(actions.receiveSignUpToGroup(data.group._id, data.group))
  } else {
    alert('Cannot join this group')
  }
}

function* fetchGroupMembers({ id }) {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.fetchGroupMembers(id)
  )
  if (!error) {
    for (let i = 0; i < data.length; i++) {
      yield fetchUser(data[i].userId)
    }
    yield put(actions.receiveGroupMembers(id, data))
  } else {
    yield put(actions.rejectGroupMembers(id, error))
  }
}

function* fetchGroupBills({ id }) {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.fetchGroupBills(id)
  )
  if (!error) {
    yield put(actions.receiveGroupBills(data))
  } else {
    yield put(actions.rejectGroupBills(error))
  }
}

function* fetchGroupDebts({ id }) {
  const { data, error } = yield call(
    api.fetch,
    api.endpoints.fetchGroupDebts(id)
  )
  if (!error) {
    yield put(actions.receiveGroupDebts(data, id))
  } else {
    yield put(actions.rejectGroupBills(error))
  }
}

function* fetchCurrentUser() {
  const data = yield call(api.fetch, api.endpoints.fetchCurrentUser())
  if (data && !data.error) {
    yield put(actions.receiveCurrentUser(data.user, data.groups))
  } else {
    redirectToMainPageIfNeeded()
  }
}

function* fetchSignUpToGroup({ group }) {
  const data = yield call(api.fetch, api.endpoints.fetchSignUpToGroup(group))
  if (data && !data.error) {
    yield put(actions.receiveSignUpToGroup(group, data.group))
  } else {
    alert('Cannot join this group')
  }
}

export default function*() {
  yield fork(loadLocalStorage)
  yield takeEvery(REQUEST_SIGN_IN, processSignIn)
  yield takeEvery(REQUEST_SIGN_OUT, processSignOut)
  yield takeEvery(REQUEST_ADD_BILL, processAddBill)
  yield takeEvery(REQUEST_GROUP_MEMBERS, fetchGroupMembers)
  yield takeEvery(REQUEST_GROUP_BILLS, fetchGroupBills)
  yield takeEvery(REQUEST_ALL_USERS, fetchAllUsers)
  yield takeEvery(REQUEST_MY_GROUPS, fetchMyGroups)
  yield takeEvery(REQUEST_GROUP_DEBTS, fetchGroupDebts)
  yield takeEvery(CREATE_NEW_GROUP, createNewGroup)
  yield takeEvery(REQUEST_CURRENT_USER, fetchCurrentUser)
  yield takeEvery(REQUEST_SIGN_UP_TO_GROUP, fetchSignUpToGroup)
  yield takeEvery(REQUEST_IGNORED_USERS_BY_ME, fetchIgnoredUsersByMe)
  yield takeEvery(REQUEST_IGNORE_USER, ignoreUser)
}
