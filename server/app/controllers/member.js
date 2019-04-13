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
    res.status(500).json({ error: error })
  }
}

const update = async (req, res) => {
  const Member = mongoose.model('Member')
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, {
      userId: req.body.userId,
      groupId: req.body.groupId,
    })
    res.status(200).json({ member })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const destroy = async (req, res) => {
  const Member = mongoose.model('Member')
  try {
    await Member.findByIdAndRemove(req.params.id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const createWithGroup = async (req, res) => {
  const Member = mongoose.model('Member')
  const member = new Member({
    userId: req.user._id,
    groupId: req.params.id,
  })
  await member.save()
  res.status(200).json({})
}

export default {
  create,
  createWithGroup,
  read,
  update,
  destroy,
}
