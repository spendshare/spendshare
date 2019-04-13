import 'whatwg-fetch'
import store from './store/store'

const protocol = 'http'
const host = 'localhost'
const port = 3000
const version = 'v1'
const url = endpoint =>
  `${protocol}://${host}:${port}/api/${version}/${endpoint}`

export default {
  fetch: async endpoint => {
    const { path, method, data } = endpoint
    const token = store.getState().session.token

    const config = { method, headers: {} }

    if (token) config.headers.Authorization = `bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    config['credentials'] = 'include'
    if (data) config.body = JSON.stringify(data)

    console.log(`-> ${path}`)
    let response, json
    try {
      response = await window.fetch(path, config)
    } catch (exception) {
      return { error: exception }
    }

    try {
      json = await response.json()
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
    addBill: params => ({
      path: url('bill'),
      method: 'POST',
      data: params,
    }),
    allGroups: {
      path: url('group/all'),
      method: 'GET',
    },
    createGroup: params => ({
      path: url('group/create'),
      method: 'POST',
      data: params,
    }),
    fetchGroupMembers: id => ({
      path: url(`group/${id}`),
      method: 'GET',
    }),
  },
}
