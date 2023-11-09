const express = require('express')
const app = express()
const cors = require('cors')
// const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use(cors())
// app.use(morgan('combined'))
app.use(bodyParser.json())



app.listen(process.env.PORT || 8081)


app.get('/status', (req, res) => { 
  var raoni = req.query.raoni || false

  if(raoni){ 
    res.send({ 
      message: 'Hello, world!'
    })
  }else
    res.send({ 
      message: 'Raoni é false!'
    })

})