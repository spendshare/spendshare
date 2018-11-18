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

// Source: https://github.com/darkskyapp/string-hash
export const hash = str => {
  let hash = 5381, i = str.length
  while(i) hash = (hash * 33) ^ str.charCodeAt(--i)
  // JavaScript does bitwise operations (like XOR, above) on 32-bit signed
  // integers. Since we want the results to be always positive, convert the
  // signed int to an unsigned by doing an unsigned bitshift.
  return hash >>> 0
}

export const getLocalStorage = (...keys) => keys.reduce((accumulator, key) => ({ ...accumulator, [key]: localStorage.getItem(key) }), {})

export const saveToLocalStorage = items => Object.keys(items).forEach(k => localStorage.setItem(k, items[k]))

export const deleteFromLocalStorage = (...keys) => keys.forEach(k => localStorage.removeItem(k))

export const optionalClass = (condition, className) => condition ? ` ${className}` : ''

export const shortenWord = word => `${word.charAt(0)}.`

export const shortenName = name => {
  const [firstName, lastName] = name.split(' ')
  return `${shortenWord(firstName[0])} ${lastName}`
}

export const getAvatar = user => `https://api.adorable.io/avatars/${(user.email ? hash(user.email) : 0) % 5000}`

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const noop = () => {}
