export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const REQUEST_ADD_BILL = 'REQUEST_ADD_BILL'
export const RECEIVE_ADD_BILL = 'RECEIVE_ADD_BILL'

export default {
  requestAddBill: () => ({ type: REQUEST_ADD_BILL }),
  receiveAddBill: bill => ({ type: RECEIVE_ADD_BILL, bill }),
  signIn: () => ({ type: SIGN_IN }),
  signOut: () => ({ type: SIGN_OUT }),
}
