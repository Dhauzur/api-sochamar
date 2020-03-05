import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let periods = new Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	numberPassangerMax: {
		type: Number,
	},
	place: {
		type: Schema.Types.ObjectID,
		ref: 'place',
	},
});

periods.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('periods', periods);
