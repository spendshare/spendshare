import express from 'express'

import session from 'express-session'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'

//const csrf = require('csurf');
import helmet from 'helmet'

import mongoStoreFactory from 'connect-mongo'
const mongoStore = mongoStoreFactory(session)
import flash from 'connect-flash'
import winston from 'winston'
import helpers from 'view-helpers'
import config from './'
import pkg from '../package.json'
import { FRONTEND_URL } from '../config/host'

const env = process.env.NODE_ENV || 'development'

export default function(app, passport) {
  app.use(helmet())

  // Compression middleware (should be placed before express.static)
  app.use(
    compression({
      threshold: 512,
    })
  )

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', FRONTEND_URL)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, authorization'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    )
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200)
    } else {
      //move on
      next()
    }
  })

  // Static files middleware
  app.use(express.static(config.root + '/public'))

  // Use winston on production
  let log
  if (env !== 'development') {
    log = {
      stream: {
        write: msg => winston.info(msg),
      },
    }
  } else {
    log = 'dev'
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log))

  // set views path and default layout
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'pug')

  // expose package.json to views
  app.use((_req, res, next) => {
    res.locals.pkg = pkg
    res.locals.env = env
    next()
  })

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())
  app.use(
    methodOverride(req => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

  // cookieParser should be above session
  app.use(cookieParser())
  app.use(cookieSession({ secret: 'secret' }))
  app.use(
    session({
      secret: pkg.name,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.mongoPath,
        collection: 'sessions',
      }),
    })
  )

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session())

  // connect flash for flash messages - should be declared after sessions
  app.use(flash())

  // should be declared after session and flash
  app.use(helpers(pkg.name))

  // adds CSRF support
  if (process.env.NODE_ENV !== 'test') {
    //app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use((_req, _res, next) => {
      // res.locals.csrf_token = req.csrfToken();
      next()
    })
  }
}
