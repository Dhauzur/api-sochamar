import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };

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
	place: {
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
	mountTotal: {
		type: Number,
	},
});

lodging.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('lodging', lodging);
