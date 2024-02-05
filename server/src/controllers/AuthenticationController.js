
const {User} = require('../models')
var config  = require('../config/config')
var  jwt  = require('jsonwebtoken')

function jwtSignUser(user){ 
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, { 
    expiresIn: ONE_WEEK
  })
}
module.exports = { 
  async register(req, res) { 
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      const token = jwtSignUser(userJson)

      res.status(200).send({ 
        user: userJson, 
        token: token
      })
    } catch (error) {
      res.status(400).send({ 
        errors: {
          email: {
            msg: 'Email já cadastrado.'
          } 
        } 
      })
    } 
  }, 
  async login(req, res) { 
    const a = req.headers 
    console.log('>>>>>>>>>', a)

    try {
      const {email, password} = req.body
      const user = await User.findOne({ 
        where: { 
          email: email
        }
      })
      if(!user) {
        res.status(403).send({ 
          error: true, 
          msg: 'Informações de login inválidas.'
        })
      }
      const isPasswordValid = await user.comparePassword(password, user.password)

      if(!isPasswordValid){ 
        res.status(403).send({ 
          error: true, 
          msg: 'Informações de login inválidas.'
        })
      }

      const userJson = user.toJSON() 
      const token = jwtSignUser(userJson)
      res.status(200).send({ 
        user: userJson,
        token: token
      })
      
    } catch (error) {
      res.status(500).send({ 
        error: error.message,
        msg: 'Ocorreu um erro. Por favor, tente novamente mais tarde.'
      })
    }
  }, 
  async getUser(req, res, next){ 
    try {
      await console.log('caiu na rota');
    } catch (error) {
      
    }
  }
}