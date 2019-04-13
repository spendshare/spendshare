import createUser from '../app/controllers/group/create'
import fetchGroups from '../app/controllers/group/all'
import passport from 'passport'
import express from 'express'

export default function(app) {
  const router = express.Router()
  router.put('/group/create', createUser)
  router.get('/group/all', fetchGroups)

  app.get(
    '/auth/google',
    passport.authenticate('login', { scope: ['email', 'profile'] })
  )

  app.get(
    '/oauth',
    passport.authenticate('login', {
      failureRedirect: 'http://localhost:8000/shrug',
    }),
    (req, res) => {
      req.session.token = req.user.token
      res.redirect('http://localhost:8000/login')
    }
  )

  app.use('/api/v1', router),
    app.use(function(err, req, res, next) {
      // treat as 404
      if (
        err.message &&
        (~err.message.indexOf('not found') ||
          ~err.message.indexOf('Cast to ObjectId failed'))
      ) {
        return next()
      }
      console.error(err.stack)
      // error page
      res.status(500).render('500', { error: err.stack })
    })

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found',
    })
  })
}
