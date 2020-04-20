import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

/**
 * create schema for a payments
 */
let payments = new Schema({
	idPlace: {
		type: String,
	},
	idLodging: {
		type: String,
	},
	startDate: {
		type: String,
	},
	endDate: {
		type: String,
	},
	mount: {
		type: String,
	},
	voucher: {
		type: Object,
	},
	comments: {
		type: Array,
	},
	paymentType: {
		type: String,
	},
});

payments.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export default model('payments', payments);
