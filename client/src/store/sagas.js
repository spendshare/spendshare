import api from '../api'
import {
    call,
    fork,
    put,
    takeEvery,
} from 'redux-saga/effects'
import actions, {
    REQUEST_SIGN_IN,
    REQUEST_SIGN_OUT,
    REQUEST_ADD_BILL,
    REQUEST_ALL_USERS,
    CREATE_NEW_GROUP,
} from './actions'
import { callSignIn } from '../GoogleAuth'
import { getLocalStorage } from '../utils'

function* loadLocalStorage() {
    const session = getLocalStorage('token', 'email', 'id', 'name')
    yield put(actions.loadLocalStorage(session))
}

function* processSignIn() {
    const googleResponse = yield call(callSignIn)
    const response = yield call(
        api.fetch,
        api.endpoints.signIn(googleResponse.Zi.id_token),
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
}

function* processAddBill(action) {
    const bill = yield call(api.fetch, api.endpoints.addBill(action.params))
    if (bill && !bill.error) {
        yield put(actions.receiveAddBill(bill))
    } else {
        yield put(actions.rejectAddBill())
    }
}

function* processFetchAllUsers() {
    const users = yield call(api.fetch, api.endpoints.allUsers)
    if (users && !users.error) {
        // FIXME
        yield put(actions.receiveAllUsers(users.data.map(u => ({ ...u, balance: 0 }))))
    } else {
        yield put(actions.rejectAllUsers)

    }
}

function* createNewGroup({ name }) {
    console.log(name)
    const users = yield call(api.fetch, api.endpoints.createGroup({ name }))
    if (users && !users.error) {
        // FIXME
        // yield put(actions.receiveAllUsers(users.data.map(u => ({ ...u, balance: 0 }))))
    } else {
        //yield put(actions.rejectAllUsers)

    }
}

export default function* () {
    yield fork(loadLocalStorage)
    yield takeEvery(REQUEST_SIGN_IN, processSignIn)
    yield takeEvery(REQUEST_SIGN_OUT, processSignOut)
    yield takeEvery(REQUEST_ADD_BILL, processAddBill)
    yield takeEvery(REQUEST_ALL_USERS, processFetchAllUsers)
    yield takeEvery(CREATE_NEW_GROUP, createNewGroup)
}
