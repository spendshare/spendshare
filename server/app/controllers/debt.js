import mongoose from 'mongoose'

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
}

const all = async (req, res) => {
  const Bill = mongoose.model('Bill')
  const bills = await Bill.find({ groupId: req.params.groupId }).sort({
    date: -1,
  })

  res.json({ data: strategies.splitwise(bills) })
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