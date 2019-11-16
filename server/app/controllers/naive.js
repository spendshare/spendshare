import mongoose from 'mongoose'
import fetch from 'node-fetch'

const { ObjectId } = mongoose.Types

function perms(arr, num, min = 0) {
  let res = []
  for (let i = min; i < arr.length; i++) {
    if (num === 1) {
      res.push([i])
    } else {
      res = res.concat(perms(arr, num - 1, i + 1).map(r => [i].concat(r)))
    }
  }
  return res
}


const additive = bills => {
  const balances = {}
  const add = (who, whom, amount) => {
    if (!balances[who]) {
      balances[who] = []
    }
    if (!balances[whom]) {
      balances[whom] = []
    }
    balances[who].push({ whom, amount })
    balances[whom].push({ whom: who, amount: -amount })
  }
  bills.forEach(b => {
    const pl = b.participants.length
    b.participants.forEach(p => {
      add(p, b.paid.userId, b.paid.amount / pl)
    })
  })
  return balances
}

const ILP = async bills => {
  const balances = {}
  if (bills.length === 0) {
    return balances
  }

  const add = (who, amount) => {
    if (!balances[who]) {
      balances[who] = 0
    }
    balances[who] += amount
  }

  bills.forEach(b => {
    //FIXME
    const pl = b.participants.length
    const amount = Math.round((b.paid.amount * 100) / pl)
    add(b.paid.userId, amount * pl)

    b.participants.forEach(p => {
      add(p, -amount)
    })
  })

  const Group = mongoose.model('Group')
  const Member = mongoose.model('Member')

  const group = await Group.find({ _id: bills[0].groupId })
  if (!group) {
    throw new Error('Bill attached to non-existent group')
  }

  const members = await Member.find({ groupId: ObjectId(group[0]._id) })
  const userIds = members.map(m => m.userId)

  const Ignored = mongoose.model('Ignored')
  const ignored = await Ignored.find({
    firstUserId: { $in: userIds },
    secondUserId: { $in: userIds },
  })

  const dislikes = ignored.map(ignored => ({
    a: ignored.firstUserId,
    b: ignored.secondUserId,
  }))

  const pairs = userIds.reduce((prev, curr) => {
    return prev.concat(userIds.filter(id => id < curr).map(i => [i, curr]))
  }, [])

  for (let N = userIds.length; N <= userIds.length * userIds.length; N++) {
    const edgesPerms = perms(pairs, N)
    for (let edges in edgesPerms) {

    }
  }






  const res = data.reduce((prev, curr) => {
    if (!prev[curr.who]) {
      prev[curr.who] = []
    }
    if (!prev[curr.whom]) {
      prev[curr.whom] = []
    }
    prev[curr.who].push({
      whom: curr.whom,
      amount: curr.what / 100,
    })
    prev[curr.whom].push({
      whom: curr.who,
      amount: -curr.what / 100,
    })
    return prev
  }, {})
  return res
}

const splitwise = bills => {
  const balances = {}
  const add = (who, amount) => {
    if (!balances[who]) {
      balances[who] = 0
    }
    balances[who] += amount
  }
  bills.forEach(b => {
    add(b.paid.userId, b.paid.amount)
    const pl = b.participants.length
    b.participants.forEach(p => {
      add(p, -b.paid.amount / pl)
    })
  })

  const flatBalances = Object.keys(balances).map(k => ({
    user: k,
    balance: balances[k],
  }))



  const settlings = []

  const pushSettling = (who, whom, amount) => {
    settlings.push({
      who,
      whom,
      amount,
    })
  }

  // FIXME
  while (flatBalances.length > 1) {
    flatBalances.sort((a, b) => a.balance - b.balance)
    if (
      -flatBalances[0].balance > flatBalances[flatBalances.length - 1].balance
    ) {
      flatBalances[0].balance += flatBalances[flatBalances.length - 1].balance
      pushSettling(
        flatBalances[0].user,
        flatBalances[flatBalances.length - 1].user,
        flatBalances[flatBalances.length - 1].balance
      )
      flatBalances.splice(-1, 1)
    } else {
      flatBalances[flatBalances.length - 1].balance += flatBalances[0].balance
      pushSettling(
        flatBalances[0].user,
        flatBalances[flatBalances.length - 1].user,
        -flatBalances[0].balance
      )
      flatBalances.shift()
    }
  }
  const settlingObject = settlings.reduce((prev, curr) => {
    if (!prev[curr.who]) {
      prev[curr.who] = []
    }
    if (!prev[curr.whom]) {
      prev[curr.whom] = []
    }
    prev[curr.who].push({ whom: curr.whom, amount: curr.amount })
    prev[curr.whom].push({ whom: curr.who, amount: -curr.amount })
    return prev
  }, {})
  return settlingObject
}

const strategies = {
  additive,
  splitwise,
  ILP,
}

const all = async (req, res) => {
  const Bill = mongoose.model('Bill')
  const bills = await Bill.find({ groupId: req.params.groupId }).sort({
    date: -1,
  })

  res.json({ data: await strategies.ILP(bills) })
}

export default [
  {
    path: '/api/v1/group/:groupId/debts/all',
    method: 'get',
    callback: all,
  },
]
