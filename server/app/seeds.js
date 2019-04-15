import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

import faker from 'faker'
export default async () => {
  const User = mongoose.model('User')
  const Bill = mongoose.model('Bill')
  const Group = mongoose.model('Group')
  const Member = mongoose.model('Member')

  await User.deleteMany({ fromBigData: true })
  await Group.deleteMany({ fromBigData: true })
  await Member.deleteMany({ fromBigData: true })
  await Bill.deleteMany({ fromBigData: true })

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

  if (process.env.BIG_DATA === 'YES') {
    const users = []


    for (let i = 0; i < 1000; i++) {
      const u = await User.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        googleId: '--placeholder--',
        fromBigData: true,
      })
      users.push(u)
    }

    const groups = []

    for (let i = 0; i < 200; i++) {
      const u = await Group.create({
        name: faker.random.word(),
        fromBigData: true,
      })
      groups.push(u)
    }

    const members = []

    const groupParticipants = {}

    const randomFromArray = array => array[Math.round(Math.random() * (array.length - 1))]

    for (let i = 0; i < 200; i++) {
      groupParticipants[groups[i]._id] = []
      for (let j = 0; j < 1000; j++) {
        if (Math.random() < 0.02) {
          const m = await Member.create({
            userId: users[j]._id,
            groupId: groups[i]._id,
            fromBigData: true,
          })
          members.push(m)
          groupParticipants[groups[i]._id].push(users[j]._id) // FIXME
        }
      }
    }

    for (let i = 0; i < 200; i++) {
      for (let j = 0; j < 30; j++) {
        const p1 = randomFromArray(groupParticipants[groups[i]._id])
        const p2 = randomFromArray(groupParticipants[groups[i]._id])
        const p3 = randomFromArray(groupParticipants[groups[i]._id])
        const bill = {
          fromBigData: true,
          date: faker.date.past(),
          title: faker.commerce.product(),
          paid: {
            amount: Math.round(Math.random() * 100),
            userId: p1,
          },
          groupId: ObjectId(groups[i]._id),
          participants: [p1, p2, p3],
        }
        await Bill.create(bill)
      }
    }
  }
}
