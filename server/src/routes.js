const auth = require('./middleware/auth')
//CONTROLLERS
const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
//POLICIES
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
module.exports = (app) => { 
  app.post('/register', 
  AuthenticationControllerPolicy.register,
  AuthenticationController.register), 
  app.post('/login',
  AuthenticationController.login),  

  app.post('/songs', 
    SongsController.post),
  app.delete('/songs/:songId', 
    SongsController.delete),
  app.get('/songs', 
    SongsController.index),
  app.get('/songs/:songId', 
    SongsController.show),
  
  app.get('/profile', 
  auth,
  AuthenticationController.getUser)


}
