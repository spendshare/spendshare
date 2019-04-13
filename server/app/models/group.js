import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: String,
})

GroupSchema.method({})
GroupSchema.static({})
mongoose.model('Group', GroupSchema)
