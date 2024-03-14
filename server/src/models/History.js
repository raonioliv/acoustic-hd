module.exports = (sequelize, DataTypes) => { 
  const history = sequelize.define('History', {})
  history.associate = function(models){ 
    history.belongsTo(models.User)
    history.belongsTo(models.Song)
  }

  return history
}