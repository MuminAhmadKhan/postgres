const { DATABASE_URL } = require('./config')
const { Sequelize  } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug');

const sequelize = new Sequelize(DATABASE_URL)

const runMigrations = async () => {
    const migrator = new Umzug({
      migrations: {
        glob: 'migrations/*.js',
      },
      storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
      context: sequelize.getQueryInterface(),
      logger: console,
    })
    
    const migrations = await migrator.up()
    console.log('Migrations up to date', {
      files: migrations.map((mig) => mig.name),
    })
  }
const checkConnection = async()=>{
    try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connection has been established successfully.',DATABASE_URL)
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return process.exit(1)
  }
  return null
}

module.exports = {sequelize, checkConnection}