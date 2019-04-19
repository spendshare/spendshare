import mongoose from 'mongoose'

export default async () => {
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

  const options = { upsert: true, new: true }

  const u1 = await User.findOneAndUpdate(
    { name: 'Marian Kowalski' },
    kowalski,
    options
  )

  const u2 = await User.findOneAndUpdate(
    { name: 'Stefan Bubak' },
    bubak,
    options
  )

  const chinczyk = { name: 'Chińczyk' }
  const g = await Group.findOneAndUpdate(chinczyk, chinczyk, options)

  const m1 = { userId: u1._id, groupId: g._id }
  await Member.findOneAndUpdate(m1, m1, options)

  const m2 = { userId: u2._id, groupId: g._id }
  await Member.findOneAndUpdate(m2, m2, options)

  const bill = {
    date: new Date('2019-04-01 08:00:00'),
    title: 'Za piwo',
    paid: {
      amount: 5,
      userId: u1._id,
    },
    groupId: g._id,
    participants: [u1._id, u2._id],
  }

  const b = await Bill.findOneAndUpdate(bill, bill, options)
}
