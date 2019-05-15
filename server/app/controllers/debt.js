import mongoose from 'mongoose'

const additive = bills => {
  console.log(bills)
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
    console.log(b)
    const pl = b.participants.length
    b.participants.forEach(p => {
      add(p, b.paid.userId, b.paid.amount / pl)
    })
  })
  return balances
}

const strategies = {
  additive,
}

const all = async (req, res) => {
  const Bill = mongoose.model('Bill')
  const bills = await Bill.find({ groupId: req.params.groupId }).sort({
    date: -1,
  })

  res.json({ data: strategies.additive(bills) })
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
