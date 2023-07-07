const  { DataTypes} = require('sequelize')
const {sequelize} = require('../utils/db')

module.exports = {

   up:async ({context:queryInterface})=> {
    await queryInterface.addColumn('blogs','year',{
    type: DataTypes.INTEGER,
    allowNull: true,
    validate:{
    isAfter: "1991-01-01",    // only allow date strings after a specific date
    isBefore: DataTypes.NOW,
      }
  })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
    }
}