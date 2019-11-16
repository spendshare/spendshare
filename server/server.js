require('dotenv').config()

import fs from 'fs'
import { join } from 'path'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import config from './config'
import expressConfig from './config/express'
import passportConfig from './config/passport'
import routesConfig from './config/routes'
// import seeds from './app/seeds'
const models = join(__dirname, 'app/models')
const port = process.env.PORT || 3000

const listen = () => {
  if (app.get('env') === 'test') return
  // seeds()
  app.listen(port)
  console.log('Express app started on port ' + port)
}

const connect = () => {
  const options = { keepAlive: 1, useNewUrlParser: true }
  mongoose.connect(config.db, options)
  return mongoose.connection
}

const app = express()
const connection = connect()

export default {
  app,
  connection,
}

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)))

passportConfig(passport)
expressConfig(app, passport)
routesConfig(app, passport)

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)
