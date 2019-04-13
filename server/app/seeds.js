import mongoose from 'mongoose'

export default () => {
  const User = mongoose.model('User')
  const Bill = mongoose.model('Bill')
  const Group = mongoose.model('Group')
  const Member = mongoose.model('Member')

  const kowalski = {
    name: 'Marian Kowalski',
    email: 'kowalski15@gmail.com',
    googleId: '--placeholder--',
  }

  const bubak = {
    name: 'Stefan Bubak',
    email: 'bubak16@gmail.com',
    googleId: '--placeholder--',
  }

  User.findOneAndUpdate({ name: 'Marian Kowalski' }, kowalski, { upsert: true })
  User.findOneAndUpdate({ name: 'Stefan Bubak' }, bubak, { upsert: true })
}
