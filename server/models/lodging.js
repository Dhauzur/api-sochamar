const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };

let Schema = mongoose.Schema;
let lodging = new Schema({
	id: {
		type: String,
	},
	group: {
		type: String,
	},
	start: {
		type: String,
	},
	company: {
		type: String,
	},
	end: {
		type: String,
	},
	service: {
		type: Array,
	},
	passengers: {
		type: Array,
	},
});

lodging.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('lodging', lodging);
