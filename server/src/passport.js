const passport = require('passport')
const {User} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

const jwtOptions = { 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwtSecret
}
  
const verify = async (payload, cb) => { 
  try {
    const user = await User.findOne({ 
      where: { 
        id: payload.id
      }
    }) 
    if (!user) {
      return cb(new Error(), false)
    }
    return cb(null, user)
  } catch (error) {
    return cb(new Error(), false)
  }
}

passport.use(new JwtStrategy(jwtOptions, verify))
module.exports = null