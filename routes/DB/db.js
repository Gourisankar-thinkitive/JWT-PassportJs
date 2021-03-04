const mongoose = require('mongoose');


const connection = mongoose.connect("mongodb://localhost:27017/passportjs",{ useNewUrlParser: true, useUnifiedTopology: true } ).then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  });


  module.exports = connection;


