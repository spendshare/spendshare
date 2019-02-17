import store from './store/store'

const protocol = 'http'
const host = 'localhost:3000'
const version = 'v1'
const url = endpoint => `${protocol}://${host}/api/${version}/${endpoint}`

export default {
  fetch: async (endpoint) => {
    const { path, method, data } = endpoint
    const token = store.getState().session.token

    const config = { method, headers: {} }

    if (token) config.headers.Authorization = `bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    if (data) config.body = JSON.stringify(data)

    const response = await fetch(path, config)

    try {
      const json = await response.json()
      return json
    } catch (exception) {
      return { error: 'Could not parse JSON' }
    }
  },
  endpoints: {
    signIn: token => ({
      path: url('session'),
      method: 'POST',
      data: token,
    }),
    signOut: {
      path: url('session'),
      method: 'DELETE',
    },
    addBill: (params , group) => ({
      path: url('1/bills'),
      method: 'POST',
      data: params,
    }),
    allBills: group => ({
      path: url('1/bills'),
      method: 'GET',
    }),
    removeBill: id => ({
      path: url(`1/bills/${id}`),
      method: 'DELETE',
    }),
    updateBill: (params, id) => ({
      path: url(`1/bills/${id}`),
      method: 'PUT',
      data: params,
    }),
    allUsers: {
      path: url('users'),
      method: 'GET',
    }
  },
}