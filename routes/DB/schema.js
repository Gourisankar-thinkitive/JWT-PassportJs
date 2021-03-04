const db = require('./db');
const mongoose = require('mongoose');


const user = new mongoose.Schema({
    username:String,
    password:String
});

module.exports = user;