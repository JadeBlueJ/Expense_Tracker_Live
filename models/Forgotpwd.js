
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forgotSchema = new Schema({
  isActive: Boolean
})

module.exports = mongoose.model('Forgotpwd', forgotSchema)

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const { v4: uuidv4 } = require('uuid');

// const Forgotpwd = sequelize.define('forgotpwd', {
//   id: {
//     type: Sequelize.UUID,
//     defaultValue: Sequelize.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//     validate: {
//       isUUID: 4
//     }
//   },
//   isActive: Sequelize.BOOLEAN
// });

// module.exports = Forgotpwd;
