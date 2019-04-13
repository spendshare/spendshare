import mongoose from 'mongoose'

export default async (req, res) => {
  const Member = mongoose.model('Member')
  if (req.user && req.user.name) {
    console.log(req.user._id)
    res.status(200).json({
      user: req.user.name,
      groups: (await Member.findByUser(req.user._id)).map(
        ({ groupId }) => groupId
      ),
    })
  } else {
    // positive coz this path is used for checking if user is logged in
    res.status(200).json({ error: 'not logged' })
  }
}
