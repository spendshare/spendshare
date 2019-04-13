import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
})

UserSchema.method({})
UserSchema.static({})
mongoose.model('User', UserSchema)
