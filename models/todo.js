import dbConnect from '../utils/dbConnect'

dbConnect()

const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema ({
  title : {
    type : String,
    required : [true, 'Please Add Title'],
    unique: true,
  },
  completed : {
    type : Boolean,
    required : [true, 'Please Choose']
  },
  date : {
    type : String,
    required : false
  },
})

module.exports = mongoose.models.List|| mongoose.model('List', ListSchema)