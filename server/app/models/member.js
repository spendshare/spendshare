import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const MemberSchema = new Schema({
  userId: ObjectId,
  groupId: ObjectId,
})

MemberSchema.method({})
MemberSchema.static({})
mongoose.model('Member', MemberSchema)
