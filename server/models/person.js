import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

/**
 * create schema for a person
 */
let persons = new Schema({
	avatar: {
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
	email: {
		type: String,
	},
	rut: {
		type: String,
	},
	birthdate: {
		type: String,
	},
	state: {
		type: String,
	},
	phone: {
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
	region: {
		type: String,
	},
	comuna: {
		type: String,
	},
	idCompany: {
		type: String,
	},
	request: {
		type: Array,
	},
});

persons.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export default model('persons', persons);
