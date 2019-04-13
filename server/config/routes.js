import group from '../app/controllers/group'
import member from '../app/controllers/member'
import bill from '../app/controllers/bill'

import passport from 'passport'
import express from 'express'

const crud = (app, object, name) => {
  if (typeof object.all === 'function') {
    app.get(`/api/v1/${name}/all`, object.all)
  }
  app.post(`/api/v1/${name}/:id`, object.create)
  app.get(`/api/v1/${name}/:id`, object.read)
  app.put(`/api/v1/${name}/:id`, object.update)
  app.delete(`/api/v1/${name}/:id`, object.destroy)
}

export default app => {
  const router = express.Router()
  crud(app, member, 'member')
  crud(app, group, 'group')
  crud(app, bill, 'bill')

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
    app.use((err, req, res, next) => {
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
