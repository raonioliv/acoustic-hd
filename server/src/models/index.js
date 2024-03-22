const fs = require('fs')
const path  = require('path')
const Sequelize  =  require('sequelize')
const config  =  require('../config/config')
const db = {}

const Song = require('./Song')
const User = require('./User')
const Bookmark = require('./Bookmark')
const History  = require('./History')



const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.pasword,
  config.db.options 
)
  db['User'] = User(sequelize, Sequelize.DataTypes)
  db['Bookmark'] = Bookmark(sequelize, Sequelize.DataTypes)
  db['History'] = History(sequelize, Sequelize.DataTypes)
  db['Song'] = Song(sequelize, Sequelize.DataTypes)

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  module.exports = db