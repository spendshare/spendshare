import mongoose from 'mongoose'
import fetch from 'node-fetch'

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

  const config = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      balances: Object.keys(balances).map(key => ({
        id: key,
        value: balances[key],
      })),
      dislikes: [],
    }),
  }
  const response = await fetch('http://localhost:1234', config)

  const data = await response.json()
  const res = data.reduce((prev, curr) => {
    if (!prev[curr.who]) {
      prev[curr.who] = []
    }
    if (!prev[curr.whom]) {
      prev[curr.whom] = []
    }
    prev[curr.who].push({ whom: curr.whom, amount: curr.what / 100 })
    prev[curr.whom].push({ whom: curr.who, amount: -curr.what / 100 })
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
  /*  {
    path: '/api/v1/bill/:id',
    method: 'get',
    callback: read,
  },*/
]
