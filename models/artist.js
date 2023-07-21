const mongoose = require('mongoose');
const validator = require('validator');

//create artist schema

const artistSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },  
   genre: {
    type: String,
    required: true
   }, 
   imageURL: {
    type: String,
    required: true,

      validate:{
        validator: (value) => validator.isURL(value),
        message: 'Invalid URL'
      },
   }  
});

module.exports = mongoose.model('Artist', artistSchema);