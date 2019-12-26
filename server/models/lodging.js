const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };


let Schema = mongoose.Schema;
let lodging = new Schema({
  id: {
    type: String
  },
  idGroup: {
    type: Number
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  numberPassanger: {
    type: Number
  },
  typePension: {
    type: Array
  },
  content: {
    type: String
  }
});

lodging.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('lodging', lodging);
