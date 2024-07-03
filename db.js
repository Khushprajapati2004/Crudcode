const mongoose = require('mongoose');

// define the mongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'


// setup mongoDB connection
mongoose.connect(mongoURL, {
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
