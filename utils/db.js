const { DATABASE_URL } = require('./config')
const { Sequelize  } = require('sequelize')
const sequelize = new Sequelize(DATABASE_URL)
const checkConnection = async()=>{
    try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.',DATABASE_URL)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

module.exports = {sequelize, checkConnection}