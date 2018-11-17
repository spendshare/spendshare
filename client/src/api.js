import store from './store/store'

const protocol = 'http'
const host = 'localhost:3000'
const version = 'v1'
const url = endpoint => `${protocol}://${host}/api/${version}/${endpoint}`

export default {
  fetch: async (endpoint, data) => {
    const { path, method } = endpoint
    const token = store.getState().session.token
    console.log(`-> ${method} ${path}`)

    const config = { method }
    if (token) config.Authorization = `bearer ${token}`
    if (data) config.body = JSON.stringify(data)

    const response = await fetch(path, config)

    try {
      const json = await response.json()
      return json
    } catch (exception) {
      return { error: 'JSON_PARSE' }
    }
  },
  endpoints: {
    signIn: {
      path: url('sign_in'),
      method: 'POST',
    },
  },
}