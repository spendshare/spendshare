'use strict';

/*
 * Module dependencies.
 */

import mongoose from 'mongoose';

//const local = require('./passport/local');


/**
 * Expose
 */

export default function(passport) {
  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  const User = mongoose.model('User');
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // use these strategies
  const google = require('./passport/google');
  passport.use('google', google);
};
