import mongoose from 'mongoose'

export default function(req, res) {
  const Group = mongoose.model('Group')
  Group.find({}).then(groups => {
    res.json(groups)
  })
}
