import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const IgnoredSchema = new Schema({
  firstUserId: ObjectId,
  secondUserId: ObjectId,
  fromBigData: Boolean,
})

IgnoredSchema.method({})
IgnoredSchema.static({})

mongoose.model('Ignored', IgnoredSchema)
