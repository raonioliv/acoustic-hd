const Joi = require('joi');

function getRegistrationSchema(){ 
  return Joi.object({ 
    firstName: Joi
      .string()
      .pattern(
        new RegExp('[a-zA-Z]$')
      )
      .messages({ 
        'string.pattern.base': 'Nome inválido.',
        'string.empty': 'Nome obrigatório.'
      }),
    lastName: Joi
      .string()
      .pattern(
        new RegExp('[a-zA-Z]$')
      )
      .messages({ 
        'string.pattern.base': 'Sobrenome inválido.',
        'string.empty': 'Sobrenome obrigatório.'
      }),
      
    email: Joi
      .string()
      .email()
      .required()
      .messages({ 
        'string.empty': 'Email obrigatório',
        'string.email': 'Insira um email válido.'
      }), 

    password: Joi
      .string()
      .required()
      .pattern(
        new RegExp('^[a-zA-Z0-9]')
      )
      .messages({
        'string.empty': 'Insira uma senha',
        'string.pattern.base': 'A senha deve conter apenas números e letras.'
      }), 
    repeat_password: Joi
      .any()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'As senhas não coincidem.'
      }),

  })
}
function getLoginSchema(){ 
  return Joi.object({ 
    email: Joi
      .string()
      .email()
      .required()
      .messages({ 
        'string.empty': 'Email obrigatório',
        'string.email': 'Insira um email válido.'
      }), 

    password: Joi
      .string()
      .required()
      .pattern(
        new RegExp('^[a-zA-Z0-9]')
      )
      .messages({
        'string.empty': 'Insira uma senha',
        'string.pattern.base': 'A senha deve conter apenas números e letras.'
      }), 
  })
}
function getValidationErrors(joiErrors){ 
  var errors = {}
  joiErrors.details.forEach((error) => { 
    errors[error.context.label] = { 
      msg: error.message, 
      field: error.context.label, 
      error: error
    }
  })
  return errors
}
module.exports = { 
  getRegistrationSchema,
  getLoginSchema,
  getValidationErrors
}