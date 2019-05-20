export default {
  db: process.env.MONGODB_URL || 'mongodb://localhost/my_app_test',
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    // callbackURL: `${BACKEND_URL}/auth/facebook/callback`,
    scope: ['email', 'user_about_me', 'user_friends'],
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'SECRET',
    // callbackURL: `${BACKEND_URL}/auth/google/callback`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ],
  },
}
