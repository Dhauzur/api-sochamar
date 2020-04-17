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
		type: Schema.Types.ObjectID,
		ref: 'place',
	},
	end: {
		type: String,
	},
	days: {
		type: Array,
	},
	persons: {
		type: Array,
	},
	mountTotal: {
		type: Number,
	},
	content: {
		type: String,
	},
});

lodging.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('lodging', lodging);
