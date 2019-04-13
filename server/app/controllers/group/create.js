import mongoose from 'mongoose'

export default function(req, res) {
  const Group = mongoose.model('Group')
  const g = new Group({
    name: req.body.name,
  })

  g.save(function(err) {
    if (err) console.log(err)
    // shrug
  })

  res.sendStatus(200)
}
