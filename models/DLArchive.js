// const Sequelize = require('sequelize')
// const sequelize = require('../util/database')
// const DLArchive = sequelize.define('dlarchive', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   fileUrl: Sequelize.STRING,
// })

// module.exports = DLArchive
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archiveSchema = new Schema({
  fileUrl: { type: String, required: true }
})

module.exports = mongoose.model('DLArchive', archiveSchema)