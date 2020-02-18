import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let company = new Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	rut: {
		type: String,
	},
	prices: {
		type: Array,
		default: [2000, 3000, 3000, 10500],
	},
});

company.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('company', company);
