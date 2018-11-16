export const parseDate = date => {
  const difference = -(new Date(date) - new Date()) / 1000.0
  if (difference < 60) return 'now'
  const times = [
    60,       // minute
    3600,     // hour
    86400,    // day
    604800,   // week
    2592000,  // month
    31536000, // year
  ]
  const names = ['minute', 'hour', 'day', 'week', 'month', 'year']
  const pluralNames = ['minutes', 'hours', 'days', 'weeks', 'months', 'years']

  let i = 0
  while (difference > times[i]) i++

  const number = Math.round(difference / times[i - 1])
  const name = number !== 1 ? pluralNames[i - 1] : names[i - 1]
  return `${number} ${name} ago`
}

export const loadScript = (onSuccess, onError) => {
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/api:client.js'

  script.onload = () => {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = gapi.auth2.init({
        client_id: '1001246833892-83a1a2g20n9jnm1ugdd3tf1o7msmsrd2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      })
      const element = document.getElementById('custom-btn')
      auth2.attachClickHandler(element, {}, onSuccess, onError)
    })
  }
  document.body.appendChild(script)
}

export const optional = (condition, className) => condition ? ` ${className}` : ''
export const shortenWord = word => `${word.charAt(0)}.`
export const getAvatar = user => `https://api.adorable.io/avatars/${user.id % 5000}`
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const noop = () => {}
