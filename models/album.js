const mongoose = require('mongoose');
const validator = require('validator');

//create album schema and model

const albumSchema = new mongoose.Schema({
   title:{
    type: String,
    required: true
   },
   releaseYear:{
    type: Number,
    required: true
   },
   genre:{
    type: String,
    required: true
   },

    artistId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'Artist',
       required: true
    },
    cover: {
       type: String, 
       required: true,


       validate: {
        validator: (value) => validator.isURL(value),
         message: 'Invalid URL'
       }
    }


   
});

 module.exports = mongoose.model('Album', albumSchema);