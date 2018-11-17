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

// Source: https://github.com/darkskyapp/string-hash
export const hash = str => {
  let hash = 5381, i = str.length
  while(i) hash = (hash * 33) ^ str.charCodeAt(--i)
  // JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  // integers. Since we want the results to be always positive, convert the
  // signed int to an unsigned by doing an unsigned bitshift.
  return hash >>> 0
}

export const saveToLocalStorage = items => Object.keys(items).forEach(k => localStorage.setItem(k, items[k]))
export const optional = (condition, className) => condition ? ` ${className}` : ''
export const shortenWord = word => `${word.charAt(0)}.`
export const getAvatar = user => `https://api.adorable.io/avatars/${hash(user.email) % 5000}`
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const noop = () => {}
