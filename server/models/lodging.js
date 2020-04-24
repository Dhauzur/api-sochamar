import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };

let lodging = new Schema({
	name: {
		type: String,
	},
	room: {
		type: Schema.Types.ObjectID,
		ref: 'rooms',
	},
	group: {
		type: Schema.Types.ObjectID,
		ref: 'periods',
	},
	place: {
		type: Schema.Types.ObjectID,
		ref: 'place',
	},
	person: {
		type: Schema.Types.ObjectID,
		ref: 'persons',
	},
	start: {
		type: String,
	},
	end: {
		type: String,
	},
	days: {
		type: Array,
	},
	totalDays: {
		type: Number,
	},
	calendar: {
		type: Array,
	},
	mountTotal: {
		type: Number,
	},
});

lodging.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('lodging', lodging);
