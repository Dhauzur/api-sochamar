import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let place = new Schema({
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
	users: [
		{
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
	],
});

place.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('place', place);
