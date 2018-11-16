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

export const optional = (condition, className) => condition ? ` ${className}` : ''
export const shortenWord = word => `${word.charAt(0)}.`
export const getAvatar = user => `https://api.adorable.io/avatars/${user.id % 5000}`
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const noop = () => {}
