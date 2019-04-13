import mongoose from 'mongoose'
const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: { type: String, default: '' },
})

GroupSchema.method({})

GroupSchema.static({})

mongoose.model('Group', GroupSchema)
