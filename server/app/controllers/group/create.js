import mongoose from 'mongoose'

export default (req, res) => {
  const Group = mongoose.model('Group')
  const g = new Group({
    name: req.body.name,
  })

  g.save(err => {
    if (err) console.log(err)
    // shrug
  })
  res.sendStatus(200)
}
