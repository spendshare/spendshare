import mongoose from 'mongoose'
import google from './passport/google'
export default function(passport) {
  passport.serializeUser((user, done) => done(null, user.id))
  const User = mongoose.model('User')
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done))
  passport.use('google', google(passport))
}
