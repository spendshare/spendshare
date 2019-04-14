import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const all = async (req, res) => {
  const Member = mongoose.model('Member')
  const members = await Member.find({ groupId: ObjectId(req.params.groupId) })
  res.json({ data: members })
}

const create = (req, res) => {
  const Member = mongoose.model('Member')
  const member = new Member({
    userId: ObjectId(req.body.userId),
    groupId: ObjectId(req.body.groupId),
  })

  member.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({ data: member })
}

const read = async (req, res) => {
  const Member = mongoose.model('Member')
  try {
    const members = await Member.find({
      groupId: ObjectId(req.params.groupId),
      userId: ObjectId(req.params.userId),
    })
    res.status(200).json({ data: members })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const update = async () => {
  throw new Error(
    "Actually I think it's not necessary to have an ability to update entry with literally two fields"
  )
}

const destroy = async (req, res) => {
  if (!req.params.userId) throw new Error('You must provide userId')
  const Member = mongoose.model('Member')
  try {
    await Member.remove({
      groupId: ObjectId(req.params.groupId),
      userId: ObjectId(req.params.userId),
    })
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
  all,
  create,
  createWithGroup,
  read,
  update,
  destroy,
}
