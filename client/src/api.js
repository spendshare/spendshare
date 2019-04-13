import 'whatwg-fetch'
import store from './store/store'

const protocol = 'http'
const host = 'localhost:3000'
const version = 'v1'
const url = endpoint => `${protocol}://${host}/api/${version}/${endpoint}`

export default {
  fetch: async endpoint => {
    const { path, method, data } = endpoint
    const token = store.getState().session.token

    const config = { method, headers: {} }

    if (token) config.headers.Authorization = `bearer ${token}`
    config.headers['Content-Type'] = 'application/json'
    config['credentials'] = 'include'
    if (data) config.body = JSON.stringify(data)

    let response, json
    try {
      response = await fetch(path, config)
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
    allUsers: {
      path: url('users'),
      method: 'GET',
    },
    createGroup: params => ({
      path: url('group/create'),
      method: 'PUT',
      data: params,
    }),
    fetchGroupMembers: params => ({
      path: url(`group/${params.name}`),
      method: 'GET',
    }),
  },
}
