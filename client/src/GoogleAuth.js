import store from './store/store'
import actions from './store/actions'

export const loadScript = (onSuccess, onError) => {
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/api:client.js'

  script.onload = () => {
    gapi.load('auth2', async () => {
      gapi.auth2.init({
        client_id: '1001246833892-83a1a2g20n9jnm1ugdd3tf1o7msmsrd2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      })
    })
  }
  document.body.appendChild(script)
}

export const callSignIn = () => {
  return gapi.auth2.getAuthInstance().signIn()
}
