import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

/**
 * create schema for a passenger
 */
let passengers = new Schema({
	passenger: {
		type: String,
	},
	documents: {
		type: Array,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	birthdate: {
		type: String,
	},
	state: {
		type: String,
	},
	appointment: {
		type: String,
	},
	function: {
		type: String,
	},
	age: {
		type: String,
	},
});

passengers.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

// export model passenger
export default model('passengers', passengers);
