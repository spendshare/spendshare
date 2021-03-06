import { FRONTEND_URL } from '../config/host'

import group from '../app/controllers/group'
import member from '../app/controllers/member'
import bill from '../app/controllers/bill'
import user from '../app/controllers/user'

import passport from 'passport'
import express from 'express'
import me from '../app/controllers/me'
import debt from '../app/controllers/debt'
import ignored from '../app/controllers/ignored'

const crud = (app, endpoints) => {
  endpoints.forEach(endpoint => {
    app[endpoint.method](endpoint.path, endpoint.callback)
  })
}

export default app => {
  const router = express.Router()
  crud(app, group)
  crud(app, user)
  crud(app, bill)
  crud(app, member)
  crud(app, debt)
  crud(app, ignored)

  app.get('/api/v1/me', me)
  app.get('/api/v1/sign-out', (req, res) => {
    req.logout()
    res.status(200).json({})
  })

  app.get(
    '/auth/google',
    passport.authenticate('login', { scope: ['email', 'profile'] })
  )

  app.get(
    '/oauth',
    passport.authenticate('login', {
      failureRedirect: `${FRONTEND_URL}/shrug`,
    }),
    (req, res) => {
      console.log(`Redirecting to frontend url ${FRONTEND_URL}`)
      req.session.token = req.user.token
      res.redirect(`${FRONTEND_URL}/groups`)
    }
  )

  app.use('/api/v1', router),
    app.use((err, _, res, next) => {
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

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })
}
