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
    userId: ObjectId(req.body.id),
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
      userId: ObjectId(req.params.id),
      groupId: ObjectId(req.params.groupId),
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
      userId: ObjectId(req.params.id),
      groupId: ObjectId(req.params.groupId),
    })
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const createWithGroup = async (req, res) => {
  const Member = mongoose.model('Member')
  const Group = mongoose.model('Group')
  const group = (await Group.find({ name: req.params.id }))[0]
  if (group === undefined) {
    res.status(200).json({ error: 'no group' })
  }
  const groupId = group._id
  const member = new Member({
    userId: req.user._id,
    groupId,
  })
  await member.save()
  res.status(200).json({ group })
}

export default [
  {
    path: '/api/v1/member/:groupId/all',
    method: 'get',
    callback: all,
  },
  {
    path: '/api/v1/member/new',
    method: 'post',
    callback: create,
  },
  {
    path: '/api/v1/member/:groupId/:id',
    method: 'get',
    callback: read,
  },
  {
    path: '/api/v1/member/:groupId/:id',
    method: 'put',
    callback: update,
  },
  {
    path: '/api/v1/member/:groupId/:id',
    method: 'delete',
    callback: destroy,
  },
  {
    path: '/api/v1/group/:id/join',
    method: 'post',
    callback: createWithGroup,
  },
]
