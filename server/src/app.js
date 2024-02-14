const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const bodyParser = require('body-parser')
app.use(cors())
app.use(morgan('combined'))
app.use( bodyParser.json())

require('./passport')
require('./routes')(app)

sequelize.sync({force: false})
  .then(() => { 
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })