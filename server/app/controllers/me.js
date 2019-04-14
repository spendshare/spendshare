import mongoose from 'mongoose'

export default async (req, res) => {
  const User = mongoose.model('User')
  const Member = mongoose.model('Member')
  if (req.user && req.user.name) {
    res.status(200).json({
      user: await User.findById(req.user._id),
      groups: (await Member.findByUser(req.user._id)).map(
        ({ groupId }) => groupId
      ),
    })
  } else {
    res.status(200).json({ error: 'not logged' })
  }
}
