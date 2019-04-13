import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  googleId: { type: String, default: null },
})

UserSchema.method({})

UserSchema.static({})

mongoose.model('User', UserSchema)
