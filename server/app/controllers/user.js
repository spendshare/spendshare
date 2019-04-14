import mongoose from 'mongoose'

const all = async (req, res) => {
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

  user.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({ data: user })
}

const read = async (req, res) => {
  const User = mongoose.model('User')
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json({ data: user })
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
    res.status(200).json({ data: user })
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

export default {
  all,
  create,
  read,
  update,
  destroy,
}
