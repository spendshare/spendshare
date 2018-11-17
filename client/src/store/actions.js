export const LOAD_LOCAL_STORAGE = 'LOAD_LOCAL_STORAGE'
export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN'
export const REJECT_SIGN_IN = 'REJECT_SIGN_IN'
export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT'
export const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT'
export const REQUEST_ADD_BILL = 'REQUEST_ADD_BILL'
export const RECEIVE_ADD_BILL = 'RECEIVE_ADD_BILL'

export default {
  loadLocalStorage: session => ({ type: LOAD_LOCAL_STORAGE, session }),
  requestAddBill: () => ({ type: REQUEST_ADD_BILL }),
  receiveAddBill: bill => ({ type: RECEIVE_ADD_BILL, bill }),
  requestSignIn: session => ({ type: REQUEST_SIGN_IN }),
  receiveSignIn: session => ({ type: RECEIVE_SIGN_IN, session }),
  rejectSignIn: error => ({ type: REJECT_SIGN_IN, error }),
  requestSignOut: () => ({ type: REQUEST_SIGN_OUT }),
  receiveSignOut: () => ({ type: RECEIVE_SIGN_OUT }),
}
