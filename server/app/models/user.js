import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
  fromBigData: Boolean,
})

UserSchema.method({})
UserSchema.static({})
mongoose.model('User', UserSchema)
