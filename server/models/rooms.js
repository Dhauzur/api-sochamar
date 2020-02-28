import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let rooms = new Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
	},
	numberPassangerMax: {
		type: Number,
	},
	company: {
		type: Schema.Types.ObjectID,
		ref: 'company',
	},
});

rooms.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('rooms', rooms);
