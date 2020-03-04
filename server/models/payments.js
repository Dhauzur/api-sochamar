import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

/**
 * create schema for a payments
 */
let payments = new Schema({
	idCompany: {
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
		type: String,
	},
	comments: {
		type: String,
	},
});

payments.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

// export model passenger
export default model('payments', payments);
