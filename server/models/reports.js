const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };

let Schema = mongoose.Schema;
let reports = new Schema({
	member: {
		type: String,
	},
	whatWasDone: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	state: {
		type: Boolean,
		default: false,
	},
});

reports.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('reports', reports);
