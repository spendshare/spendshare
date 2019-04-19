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
})

BillSchema.method({})
BillSchema.static({})
mongoose.model('Bill', BillSchema)
