import mongoose from 'mongoose'

const all = async (_req, res) => {
  const Ignored = mongoose.model('Ignored')
  const ignored = await Ignored.find({})
  res.json({ data: ignored })
}

const create = async (req, res) => {
  const Ignored = mongoose.model('Ignored')
  const ignored = new Ignored({
    firstUserId: req.user._id,
    secondUserId: req.params.id,
  })

  ignored.save(error => {
    if (error) console.log(err)
  })

  res.status(200).json({ data: ignored })
}

const read = async (req, res) => {
  const Ignored = mongoose.model('Ignored')
  try {
    const ignored = await Ignored.find({ firstUserId: req.user._id })
    res.status(200).json({ data: ignored })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export default [
  {
    path: '/api/v1/ignored/all',
    method: 'get',
    callback: all,
  },
  {
    path: '/api/v1/ignored/create/:id',
    method: 'post',
    callback: create,
  },
  {
    path: '/api/v1/ignored/me',
    method: 'get',
    callback: read,
  },
]
