import mongoose from 'mongoose'

const all = async (req, res) => {
  console.log('chuuuj')
  const Bill = mongoose.model('Bill')
  const bills = await Bill.find({ groupId: req.params.groupId })
  res.json({ data: bills })
}

const create = (req, res) => {
  const Bill = mongoose.model('Bill')
  const bill = new Bill({
    title: req.body.title,
    amount: req.body.addedBy,
    participants: req.body.participants,
  })

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
