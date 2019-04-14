import mongoose from 'mongoose'

const all = async (req, res) => {
  const Group = mongoose.model('Group')
  const groups = await Group.find({})
  res.json({ data: groups })
}

const create = (req, res) => {
  const Group = mongoose.model('Group')
  const group = new Group({
    name: req.body.name,
  })

  group.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({ data: group })
}

const read = async (req, res) => {
  const Group = mongoose.model('Group')
  try {
    const group = await Group.findById(req.params.id)
    res.status(200).json({ data: group })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const update = async (req, res) => {
  const Group = mongoose.model('Group')
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    })
    res.status(200).json({ data: group })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const destroy = async (req, res) => {
  const Group = mongoose.model('Group')
  try {
    await Group.findByIdAndRemove(req.params.id)
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
