var bcrypt = require('bcrypt')

module.exports = (sequelize, dataTypes) => { 
  const user = sequelize.define('User', { 
    firstName: { 
      type: dataTypes.TEXT,
    }, 
    lastName: { 
      type: dataTypes.TEXT,
    }, 
    email: { 
      type: dataTypes.STRING, 
      unique: true
    },
    password: {
      type: dataTypes.STRING
    }, 
    initials: { 
      type: dataTypes.STRING
    }
 
  }, { 
    hooks: {
      beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      },
      beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
      },
    }
  });
  user.prototype.comparePassword = async (password, hash) => { 
    return await bcrypt.compareSync(password, hash)
  }
  return user
}