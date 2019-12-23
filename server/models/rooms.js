const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;
let rooms = new Schema({
  id: {
    type: String
  },
  name: {
    type: Date,
  },
  numberPassangerMax: {
    type: Number
  },
});

rooms.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('rooms', rooms);
