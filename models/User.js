const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isPremium:{
      type:Boolean, 
    },
    totalExp:{
      type:Number,
      default:0,
    }
})

module.exports = mongoose.model('User',userSchema)

// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const User = sequelize.define('user',{
//   id:{
//     type:Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey:true
//   },
//   name:{
//     type:Sequelize.STRING,
//     allowNull: false
//   },
//   mail:{
//     type:Sequelize.STRING,
//     allowNull: false,
//     unique:true

//   },
//   password:{
//     type:Sequelize.STRING,
//     allowNull: false,

//   },
//   isPremium:Sequelize.BOOLEAN,
//   totalExp:{
//     type:Sequelize.DOUBLE,
//     defaultValue:0.0,
//   }
// })

// module.exports = User