const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };


let Schema = mongoose.Schema;
let stance = new Schema({
  id: {
    type: String
  },
  idGroup: {
    type: Number
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  numberPassanger: {
    type: Number
  },
  typePension: {
    type: Array
  },
});

stance.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('stance', stance);
