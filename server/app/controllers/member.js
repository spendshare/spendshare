import mongoose from 'mongoose'

const create = (req, res) => {
  const Member = mongoose.model('Member')
  const member = new Member({
    userId: req.body.userId,
    groupId: req.body.groupId,
  })

  member.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({})
}

const read = async (req, res) => {
  const Member = mongoose.model('Member')
  try {
    const member = await Member.findById(req.params.id)
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
  create,
  read,
  update,
  destroy,
}
