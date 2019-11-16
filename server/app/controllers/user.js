import mongoose from 'mongoose'

const addBills = async user => {
  const Bill = mongoose.model('Bill')
  const bills = await Bill.findByParticipant(user._id)
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    googleId: user.googleId,
    bills,
  }
}

const all = async (_req, res) => {
  const User = mongoose.model('User')
  const users = await User.find({})
  res.json({ data: users })
}

const create = (req, res) => {
  const User = mongoose.model('User')
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    googleId: req.body.googleId,
  })

  user.save(error => {
    if (error) console.log(error)
  })

  res.status(200).json({ data: user })
}

const read = async (req, res) => {
  const User = mongoose.model('User')
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ data: await addBills(user) })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const update = async (req, res) => {
  const User = mongoose.model('User')
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    })
    res.status(200).json({ data: await addBills(user) })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const destroy = async (req, res) => {
  const User = mongoose.model('User')
  try {
    await User.findByIdAndRemove(req.params.id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default [
  {
    path: '/api/v1/user/all',
    method: 'get',
    callback: all,
  },
  {
    path: '/api/v1/user/new',
    method: 'post',
    callback: create,
  },
  {
    path: '/api/v1/user/:id',
    method: 'get',
    callback: read,
  },
  {
    path: '/api/v1/user/:id',
    method: 'put',
    callback: update,
  },
  {
    path: '/api/v1/user/:id',
    method: 'delete',
    callback: destroy,
  },
]
