import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let userSchema = new Schema({
	name: {
		type: String,
	},
	lastName: {
		type: String,
		default: '',
	},
	googleId: { type: String },
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	img: {
		type: String,
		required: false,
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
	analyst: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		default: 'admin',
		enum: ['person', 'admin'],
	},
	idPerson: {
		type: String,
		required: false,
	},
});

userSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;

	return userObject;
};

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

export default model('User', userSchema);
