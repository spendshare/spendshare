import store from './store/store'

const protocol = 'http'
const host = 'localhost:3000'
const version = 'v1'
const url = endpoint => `${protocol}://${host}/api/${version}/${endpoint}`

export default {
  fetch: async (endpoint) => {
    const { path, method, data } = endpoint
    const token = store.getState().session.token
    console.log(`-> ${method} ${path}`)

    const config = { method, headers: {} }

    if (token) config.headers.Authorization = `bearer ${token}`
    if (data) {
      console.log('data: ', data)
      config.body = JSON.stringify(data)
    }

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
    signOut: () => ({
      path: url('session'),
      method: 'DELETE',
    }),
    addBill: params => ({
      path: url('bill'),
      method: 'POST',
      data: params,
    })
  },
}