import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import keys from './config/keys'

import './models/Csv'
import CsvRoute from './routes/csvRoute'

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use('/api/**', bodyParser.json())

CsvRoute(app)

if (process.env.NODE_ENV === 'production') {
  // Express wil serve up production assets
  // like main.js, main.css
  app.use(express.static('client/dist'))

  // Express will serve up the index.hml file
  // if does not recognize the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.timeout = 300000
app.listen(PORT)
