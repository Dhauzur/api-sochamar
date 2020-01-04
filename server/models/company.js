const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;
let company = new Schema({
  id: {
    type: String
  },
  name: {
    type: String,
  },
  rut: {
    type: String,
  }
});

company.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('company', company);
