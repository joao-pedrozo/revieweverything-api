const mongoose = require('mongoose');

const initDB = () => {

    mongoose.connect(
      'mongodb+srv://root:pass@cluster0.mygcu.mongodb.net/mongocrud?retryWrites=true&w=majority',
      { useNewUrlParser: true }
    );
  
    mongoose.connection.once('open', () => {
      console.log('connected to database');
    });
  
  }
  
  module.exports = initDB;