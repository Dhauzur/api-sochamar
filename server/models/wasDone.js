const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };


let Schema = mongoose.Schema;
let toDo = new Schema({
    workPlace: {
        type: String
    },
    whatWasDone: {
        type: [String]
    },
    ncamas: {
        type: Number,
        default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
});

toDo.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('toDo', toDo);
