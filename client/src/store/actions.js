export const LOAD_LOCAL_STORAGE = 'LOAD_LOCAL_STORAGE'

export const REQUEST_ADD_BILL = 'REQUEST_ADD_BILL'
export const RECEIVE_ADD_BILL = 'RECEIVE_ADD_BILL'
export const REJECT_ADD_BILL = 'REJECT_ADD_BILL'

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN'
export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN'
export const REJECT_SIGN_IN = 'REJECT_SIGN_IN'

export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT'
export const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT'

export const REQUEST_ALL_USERS = 'REQUEST_ALL_USERS'
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS'
export const REJECT_ALL_USERS = 'REJECT_ALL_USERS'

export default {
  loadLocalStorage: session => ({ type: LOAD_LOCAL_STORAGE, session }),

  requestAddBill: params => ({ type: REQUEST_ADD_BILL, params }),
  receiveAddBill: bill => ({ type: RECEIVE_ADD_BILL, bill }),
  rejectAddBill: () => ({ type: REJECT_ADD_BILL }),

  requestAllUsers: () => ({ type: REQUEST_ALL_USERS }),
  receiveAllUsers: users => ({ type: RECEIVE_ALL_USERS, users }),
  rejectAllUsers: () => ({ type: REJECT_ALL_USERS }),

  requestSignIn: () => ({ type: REQUEST_SIGN_IN }),
  receiveSignIn: session => ({ type: RECEIVE_SIGN_IN, session }),
  rejectSignIn: error => ({ type: REJECT_SIGN_IN, error }),

  requestSignOut: () => ({ type: REQUEST_SIGN_OUT }),
  receiveSignOut: () => ({ type: RECEIVE_SIGN_OUT }),
}
