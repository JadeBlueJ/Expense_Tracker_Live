const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  status: String,
  orderId: String,
  paymentId: String,
})

module.exports = mongoose.model('Order', orderSchema)


// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const Order = sequelize.define('order',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey:true
//   },
//   status:Sequelize.STRING,
//   orderid:Sequelize.STRING,
//   paymentid:Sequelize.STRING,
// })

// module.exports = Order