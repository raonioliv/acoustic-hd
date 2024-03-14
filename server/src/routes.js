const auth = require('./middleware/auth')
//CONTROLLERS
const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const BookmarkController = require('./controllers/BookmarkController')
const ProfileController = require('./controllers/ProfileController')
//POLICIES
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProfileControllerPolicy = require('./policies/ProfileControllerPolicy')
const HistoryController = require('./controllers/HistoryController')
module.exports = (app) => { 
  app.post('/register', 
  AuthenticationControllerPolicy.register,
  AuthenticationController.register), 
  app.post('/login',
  AuthenticationController.login),  

  app.post('/songs', 
    SongsController.post),
  // app.delete('/songs/:songId', 
  //   SongsController.delete),
  app.get('/songs', 
    SongsController.index),
  app.get('/songs/:songId', 
    SongsController.show),
  
  
  app.post('/bookmark', 
    auth,
    BookmarkController.post
  ),
  app.get('/bookmark', 
    auth,
    BookmarkController.index
  ),
  app.delete('/bookmark', 
    auth,
    BookmarkController.delete
  ),
  app.post('/history', 
  auth, 
  HistoryController.post
  ),
  app.get('/history', 
  auth, 
  HistoryController.index
  )

  app.get('/profile', 
  auth,
  ProfileController.getUser)

  app.put('/profile', 
  auth, 
  ProfileControllerPolicy.editProfile,
  ProfileController.editProfile
  )

}
