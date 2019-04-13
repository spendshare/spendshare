import mongoose from 'mongoose'

const all = async (req, res) => {
  const Group = mongoose.model('Group')
  const groups = await Group.find({})
  res.json(groups)
}

const create = (req, res) => {
  const Group = mongoose.model('Group')
  const group = new Group({
    name: req.body.name,
  })

  group.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({})
}

const read = async (req, res) => {
  const Group = mongoose.model('Group')
  try {
    const member = await Group.findById(req.params.id)
    res.status(200).json({ member })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}

const update = async (req, res) => {
  res.status(200).json({})
}

const destroy = async (req, res) => {
  res.status(200).json({})
}

export default {
  all,
  create,
  read,
  update,
  destroy,
}
