const protocol = 'http'
const host = 'localhost:3000'
const version = 'v1'
const url = endpoint => `${protocol}://${host}/api/${version}/${endpoint}`

export default {
  fetch: async (endpoint, data) => {
    const { path, method } = endpoint
    console.log(`-> ${method} ${path}`)

    const config = {
      headers: {
        Authorization: 'dupa123',
      },
      method,
    }

    if (data) config.body = JSON.stringify(data)

    const response = await fetch(path, config)

    console.log(`response: ${JSON.stringify(response, null, 4)}`)

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