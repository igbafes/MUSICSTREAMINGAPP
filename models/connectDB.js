require('dotenv').config();
 const mongoose = require('mongoose');

 const url = process.env.LOCAL_COMPASS_URI || process.env.MONGO-ATLAS_URI;

 const DBconnection = () =>{
    mongoose.connect(url)
    .then(() => {
        console.log('DB connected successfully')
   })
    .catch(() => {console.log('Something went wrong')
});
 }

 module.exports = DBconnection