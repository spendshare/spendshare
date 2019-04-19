import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const MemberSchema = new Schema({
  userId: ObjectId,
  groupId: ObjectId,
})

MemberSchema.method({})
MemberSchema.static({
  findByUser: async me => {
    const Member = mongoose.model('Member')
    return await Member.find({ userId: me })
  },
})

mongoose.model('Member', MemberSchema)
