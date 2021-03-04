const db = require('./db');
const mongoose = require('mongoose');
const schema = require('./schema');


const Model = new mongoose.model('User',schema);


module.exports = Model;