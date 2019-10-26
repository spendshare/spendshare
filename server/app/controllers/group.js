import mongoose from 'mongoose'

const all = async (_, res) => {
  const Group = mongoose.model('Group')
  const groups = await Group.find({})
  res.json({ data: groups })
}

const allmy = async (req, res) => {
  const Member = mongoose.model('Member')
  const groups = (await Member.aggregate([
    { $match: { userId: req.user._id } },
    {
      $lookup: {
        from: 'groups',
        localField: 'groupId',
        foreignField: '_id',
        as: 'group',
      },
    },
  ])).map(g => g.group[0])

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

export default [
  {
    path: '/api/v1/group/all',
    method: 'get',
    callback: all,
  },
  {
    path: '/api/v1/group/allmy',
    method: 'get',
    callback: allmy,
  },
  {
    path: '/api/v1/group/new',
    method: 'post',
    callback: create,
  },
  {
    path: '/api/v1/group/:id',
    method: 'get',
    callback: read,
  },
  {
    path: '/api/v1/group/:id',
    method: 'put',
    callback: update,
  },
  {
    path: '/api/v1/group/:id',
    method: 'delete',
    callback: destroy,
  },
]
