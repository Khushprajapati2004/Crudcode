const mongoose = require('mongoose');
require('dotenv').config();

// define the mongoDB connection URL
// const mongoURL = process.env.MONGODB_URL;


// setup mongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// get the default connection 
//Mongoose maintains a default connection object representing the MongoDb connection.
const db = mongoose.connection;

// define event listeners for database connection
db.on('connected', () => {
    console.log('connected to MongoDB successfully ')
});

// when occure error
db.on('error', (err) => {
    console.log('MongoDB connection error', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


// export the database connection
module.exports = db;
