const { User } = require('../models')
const jwt = require('jsonwebtoken')
const validationHelpers = require('../helpers/validationHelper')
const config = require('../config/config')
module.exports = { 
  async getUser(req, res){ 
    try {
      const user = await User.findOne({ 
        where: { 
          id: req.user.id 
        }
      })
      user.password = undefined 
      res.status(200).send(user)
    } catch (error) {
      res.status(500).send({ 
        msg: 'An error has ocurred. Please, try again later.'
      })
    }
  },
  async editProfile(req, res, next){ 
    try {
      const profile = req.body
      let user = await User.findOne({ 
        where: { 
          id: req.user.id
        }
      })
      const emailAlreadyExists = await validationHelpers.getEmailAlreadyRegistered(req.body.email, req.user.id)
      const isPasswordValid = await user.comparePassword(profile.password, user.password)  
      if(!isPasswordValid){ 
        res.status(500).send({ 
          errors: { 
            password: 'Senha incorreta.'
          }
        })
      }else if(emailAlreadyExists){ 
        res.status(500).send({ 
          errors: { 
            email: 'Email já cadastrado.'
          }
        })
      }else{ 
        const initials = req.body.firstName.charAt(0).toUpperCase() + req.body.lastName.charAt(0).toUpperCase()
        let updateUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          initials: initials,
          password: req.body.new_password
        }
        user = await user.update(updateUser) 
        user.password = undefined
        res.status(200).send({ 
          msg: 'Perfil editado com sucesso!',
          user: user
        })
      }
    } catch (error) {
      res.status(500).send({ 
        msg: 'Ocorreu um erro ao editar o perfil.'
      })
    }
  }, 
  async changePassword (req, res, next){ 
    try {
      const {temporaryToken, new_password, new_password_repeat} = req.body
      const {userId} = jwt.verify(temporaryToken, config.authentication.jwtSecret)
      let user;
      if(userId){ 
        user = await User.findOne({ 
          where: { 
            id: userId
          }, 
          attributes: { 
            exclude: ['password']
          }
        }),
        user = await user.update({ 
          password: new_password
        })
      }
      const userJSON = user.toJSON()
      const ONE_WEEK = 60 * 60 * 24 * 7
      const token = jwt.sign(userJSON, config.authentication.jwtSecret, {expiresIn: ONE_WEEK})
      res.status(200).send({ 
        user: user,
        token: token,
        msg: 'success'
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({ 
        msg: 'Um erro ocorreu provavelmente devido a expiração da sessão. Tente novamente.'
      })
    }
  }
}