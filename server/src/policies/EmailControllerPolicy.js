const { User } = require('../models')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
function generateTemporaryToken(payload, expiresIn){ 
  return jwt.sign(payload, config.authentication.jwtSecret, {expiresIn})
}

module.exports = { 
  async sendEmail(req, res, next){ 
    try {
      const schema = Joi.object({ 
        email: Joi
        .string()
        .email()
        .required()
        .messages({ 
          'string.empty': 'Email obrigatório',
          'string.email': 'Insira um email válido.'
        }), 
      })
      const { error, value } = schema.validate(req.body)
      if(error) { 
        res.status(403).send({ 
          msg: error.details[0].message
        })
      }
      const user = await User.findOne({ 
        where: { 
          email: req.body.email
        }
      })
      if(!user){ 
        res.status(403).send({ 
          msg: 'Email não cadastrado.'
        })
      }else{ 
        const temporaryToken = generateTemporaryToken({
          userId: user.id
        }, '1h')
        req.user = user
        req.temporaryToken = temporaryToken
        next()
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Algo deu errado. Tente novamente mais tarde.'
      })
    }
  }
}