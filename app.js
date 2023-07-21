const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const artistsRouter = require('./routes/artists');
const albumsRouter = require('./routes/albums');
const DBconnection = require('./models/connectDB');
const port = process.env.PORT || 5000 ;


require('dotenv').config();


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(xss());

app.use('/api/artists', artistsRouter);
app.use('/api/albums', albumsRouter);

app.listen(port, async() => {
    await DBconnection();
   console.log(`Server started on port: ${port}`)
})



