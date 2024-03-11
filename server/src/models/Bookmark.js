const { BelongsTo } = require("sequelize");

module.exports = (sequelize, DataTypes) => { 
  const bookmark = sequelize.define('Bookmark', {})
  bookmark.associate = function(models){ 
    bookmark.belongsTo(models.User)
    bookmark.belongsTo(models.Song)
  }

  return bookmark
}