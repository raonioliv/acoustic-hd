const { User } = require('../models')
const validationHelpers = require('../helpers/validationHelper')

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
  }
}