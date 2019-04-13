import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const MemberSchema = new Schema({
  userId: { type: ObjectId, default: null },
  groupId: { type: ObjectId, default: null },
})

MemberSchema.method({})

MemberSchema.static({})

mongoose.model('Member', MemberSchema)
