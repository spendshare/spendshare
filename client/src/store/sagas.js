import api from '../api'
import { takeEvery, call, put } from 'redux-saga/effects'
import actions, { REQUEST_SIGN_IN } from './actions'
import { callSignIn } from '../GoogleAuth'

function* processSignIn() {
  console.log('processSignIn')
  const googleResponse = yield call(callSignIn)
  console.log(googleResponse)
  const data = yield call(api.fetch, api.endpoints.signIn, '')

  if (data && !data.error) {
    yield put(actions.receiveSignIn(data))
  } else {
    yield put(actions.rejectSignIn(data.error))
  }
}

export default function* () {
  console.log('sagas!')
  yield takeEvery(REQUEST_SIGN_IN, processSignIn)
}
