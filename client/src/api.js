import 'whatwg-fetch'
import store from './store/store'
import { BACKEND_URL } from './utils'

const version = 'v1'
const url = endpoint => `${BACKEND_URL}/api/${version}/${endpoint}`

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
    signOut: () => ({
      path: url('sign-out'),
      method: 'GET',
    }),
    addBill: params => ({
      path: url('bill/new'),
      method: 'POST',
      data: params,
    }),
    fetchGroupDebts: groupId => ({
      path: url(`group/${groupId}/debts/all`),
      method: 'GET',
    }),
    myGroups: () => ({
      path: url('group/allmy'),
      method: 'GET',
    }),
    allUsers: () => ({
      path: url('user/all'),
      method: 'GET',
    }),
    createGroup: params => ({
      path: url('group/new'),
      method: 'POST',
      data: params,
    }),
    fetchGroupMembers: groupId => ({
      path: url(`member/${groupId}/all`),
      method: 'GET',
    }),
    fetchGroupBills: groupId => ({
      path: url(`group/${groupId}/bill/all`),
      method: 'GET',
    }),
    fetchCurrentUser: () => ({
      path: url('me'),
      method: 'GET',
    }),
    fetchUser: id => ({
      path: url(`user/${id}`),
      method: 'GET',
    }),
    fetchSignUpToGroup: group => ({
      path: url(`group/${group}/join`),
      method: 'POST',
    }),
  },
}
