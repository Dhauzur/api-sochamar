const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

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
module.exports = mongoose.model('passengers', passengers);
