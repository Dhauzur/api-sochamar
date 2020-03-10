import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let placeServices = new Schema({
	placeId: {
		type: Schema.Types.ObjectID,
		ref: 'place',
	},
	name: {
		type: String,
	},
	price: {
		type: Number,
	},
});

placeServices.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
export default model('placeServices', placeServices);
