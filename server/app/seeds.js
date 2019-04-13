import mongoose from 'mongoose'

export default () => {
  const User = mongoose.model('User')
  const Bill = mongoose.model('Bill')
  const Group = mongoose.model('Group')
  const Member = mongoose.model('Member')

  const kowalski = {
    name: 'Jan Kowalski',
    email: 'kowalski15@gmail.com',
    googleId: '--placeholder--',
  }

  const nowak = {
    name: 'Stefan Nowak',
    email: 'nowak16@gmail.com',
    googleId: '--placeholder--',
  }

  User.findOneAndUpdate({ name: 'Jan Kowalski' }, kowalski, { upsert: true })
  User.findOneAndUpdate({ name: 'Stefan Nowak' }, nowak, { upsert: true })
}
