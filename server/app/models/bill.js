import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const BillSchema = new Schema({
  title: String,
  amount: Number,
  addedBy: ObjectId,
  participants: [ObjectId],
})

BillSchema.method({})
BillSchema.static({})
mongoose.model('Bill', BillSchema)
