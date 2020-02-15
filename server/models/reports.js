import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

// let rolesValidos = {
//     values: ['COMPRA', 'VENTA'],
//     message: '{VALUE} no es un tipo válido'
// };

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
export default model('reports', reports);
