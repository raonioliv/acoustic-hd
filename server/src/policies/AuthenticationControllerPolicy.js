module.exports = { 
    register(req, res, next){ 
      const validationHelper = require('../helpers/validationHelper')
      const schema = validationHelper.getRegistrationSchema()

      var { error, value } = schema.validate(req.body, {abortEarly: false})
      
      if(error) { 
        var errorObj = validationHelper.getValidationErrors(error)
        res.status(403).send({
          errors: errorObj,
        })
      }else{ 
        next()
      }
      
    }, 
}