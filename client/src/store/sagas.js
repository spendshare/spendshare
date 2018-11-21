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
    const response = yield call(api.fetch, api.endpoints.signOut())
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

export default function* () {
    yield fork(loadLocalStorage)
    yield takeEvery(REQUEST_SIGN_IN, processSignIn)
    yield takeEvery(REQUEST_SIGN_OUT, processSignOut)
    yield takeEvery(REQUEST_ADD_BILL, processAddBill)
}
