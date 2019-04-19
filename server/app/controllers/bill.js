import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const all = async (req, res) => {
  console.log('chuuuj')
  const Bill = mongoose.model('Bill')
  const bills = await Bill.find({ groupId: req.params.groupId }).sort({
    date: -1,
  })
  res.json({ data: bills })
}

const create = (req, res) => {
  const Bill = mongoose.model('Bill')
  const params = {
    date: req.body.date,
    title: req.body.title,
    paid: {
      amount: req.body.paid.amount,
      userId: ObjectId(req.body.paid.userId),
    },
    addedBy: ObjectId(req.body.addedBy),
    groupId: ObjectId(req.body.groupId),
    participants: req.body.participants.map(ObjectId),
  }
  const bill = new Bill(params)

  bill.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({ data: bill })
}

const read = async (req, res) => {
  const Bill = mongoose.model('Bill')
  try {
    const bill = await Bill.findById(req.params.id)
    res.status(200).json({ data: bill })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const update = async (req, res) => {
  const Bill = mongoose.model('Bill')
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      amount: req.body.addedBy,
      participants: req.body.participants,
    })
    res.status(200).json({ data: bill })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const destroy = async (req, res) => {
  const Bill = mongoose.model('Bill')
  try {
    await Bill.findByIdAndRemove(req.params.id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default [
  {
    path: '/api/v1/group/:groupId/bill/all',
    method: 'get',
    callback: all,
  },
  {
    path: '/api/v1/bill/new',
    method: 'post',
    callback: create,
  },
  {
    path: '/api/v1/bill/:id',
    method: 'get',
    callback: read,
  },
  {
    path: '/api/v1/bill/:id',
    method: 'put',
    callback: update,
  },
  {
    path: '/api/v1/user/:id',
    method: 'delete',
    callback: destroy,
  },
]
