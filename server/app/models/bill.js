import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const BillSchema = new Schema({
  date: Date,
  title: String,
  paid: {
    amount: Number,
    userId: ObjectId,
  },
  addedBy: ObjectId,
  groupId: ObjectId,
  participants: [ObjectId],
  fromBigData: Boolean,
})

BillSchema.method({})
BillSchema.static({
  findByParticipant: async id => {
    const Bill = mongoose.model('Bill')
    return await Bill.find({ participants: id })
  },
})
mongoose.model('Bill', BillSchema)
