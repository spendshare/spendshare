import mongoose from 'mongoose'
const Member = mongoose.model('Member')

export const create = (req, res) => {
  const member = new Member({
    userId: req.body.userId,
    groupId: req.body.groupId,
  })

  member.save(err => {
    if (err) console.log(err)
  })

  res.status(200).json({})
}

export const read = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
    res.status(200).json({ member })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error })
  }
}

export const update = async (req, res) => {
  res.status(200).json({})
}

export const destroy = async (req, res) => {
  res.status(200).json({})
}
