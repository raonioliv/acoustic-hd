const jwt = require('jsonwebtoken')
const config = require('../config/config')
module.exports = { 
  isAuthenticated(req, res, next){ 
    //auth middleware logic
    const token = req.headers.authentication.split(' ')[1]
    const user = jwt.verify(token, config.authentication.jwtSecret)
    
    if(!user || !token){ 
      var err = new Error('Você não tem permissão para acessar este recurso.')
      err.status = 401
      return next(err)
    }
    return next()
  }
}