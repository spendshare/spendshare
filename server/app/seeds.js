import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types
import config from '../config'
import faker from 'faker'

export default async function seeds() {
  const optionsm = { keepAlive: 1, useNewUrlParser: true }
  mongoose.connect(config.mongoPath, optionsm)
  mongoose.connection.once('open', async () => {
    require('./models/user')
    require('./models/bill')
    require('./models/group')
    require('./models/member')
    require('./models/ignored')
    const User = mongoose.model('User')
    const Bill = mongoose.model('Bill')
    const Group = mongoose.model('Group')
    const Member = mongoose.model('Member')
    const Ignored = mongoose.model('Ignored')

    await User.deleteMany({})
    await Group.deleteMany({})
    await Member.deleteMany({})
    await Bill.deleteMany({})
    await Ignored.deleteMany({})
    console.log('deleted old')

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
      console.log(u.name)
      groups.push(u)
    }

    const members = []

    const ignored = []

    const groupParticipants = {}

    const randomFromArray = array =>
      array[Math.round(Math.random() * (array.length - 1))]

    // Create 200 groups.
    for (let i = 0; i < 200; i++) {
      groupParticipants[groups[i]._id] = []
      // Iterate over all 1000 users.
      for (let j = 0; j < 1000; j++) {
        if (Math.random() < 0.02) {
          const m = await Member.create({
            userId: users[j]._id,
            groupId: groups[i]._id,
            fromBigData: true,
          })
          members.push(m)

          // It is important this step is done before adding current member
          if (Math.random() < 0.08) {
            const blockedUserId = randomFromArray(
              groupParticipants[groups[i]._id]
            )
            const ig = await Ignored.create({
              firstUserId: users[j]._id,
              secondUserId: blockedUserId,
              fromBigData: true,
            })
            ignored.push(ig)
          }

          groupParticipants[groups[i]._id].push(users[j]._id) // FIXME
        }
      }
    }

    const promises = []
    for (let i = 0; i < 200; i++) {
      for (let j = 0; j < 30; j++) {
        const p1 = randomFromArray(groupParticipants[groups[i]._id])
        const p2 = randomFromArray(groupParticipants[groups[i]._id])
        const p3 = randomFromArray(groupParticipants[groups[i]._id])

        const ps = new Set([p1, p2, p3])

        const bill = {
          fromBigData: true,
          date: faker.date.past(),
          title: faker.commerce.product(),
          paid: {
            amount: Math.round(Math.random() * 100),
            userId: p1,
          },
          groupId: ObjectId(groups[i]._id),
          participants: [...ps],
        }
        promises.push(Bill.create(bill))
      }
    }
    await Promise.all(promises)
    console.log('Seed applied')
  })
}

seeds()
