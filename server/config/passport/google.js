import mongoose from 'mongoose'
import { BACKEND_URL } from '../host'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
export default passport =>
  passport.use(
    'login',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${BACKEND_URL}/oauth`,
      },
      (_accessToken, _refreshToken, profile, done) => {
        const User = mongoose.model('User')
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (err) {
            return done(err)
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            })
            user.save(function(err) {
              if (err) console.log(err)
              return done(err, user)
            })
          } else {
            // found user -> return
            return done(err, user)
          }
        })
      }
    )
  )
