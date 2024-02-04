const auth = require('./middleware/auth')
//CONTROLLERS
const AuthenticationController = require('./controllers/AuthenticationController')

//POLICIES
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => { 
  app.post('/register', 
  AuthenticationControllerPolicy.register,
  AuthenticationController.register), 
  app.post('/login',
  AuthenticationController.login)

}
