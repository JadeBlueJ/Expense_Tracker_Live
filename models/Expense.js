const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
},
    { timestamps: true })

module.exports = mongoose.model('Expense', expenseSchema)

// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const Expense = sequelize.define('expense',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey:true
//   },
//   amount:{
//     type:Sequelize.DOUBLE,
//     allowNull: false
//   },
//   description:{
//     type:Sequelize.STRING,
//     allowNull: false,

//   },
//   category:{
//     type:Sequelize.STRING,
//     allowNull: false,

//   },
// })

// module.exports = Expense