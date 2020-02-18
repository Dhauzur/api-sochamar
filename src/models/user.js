import uniqueValidator from 'mongoose-unique-validator';
import { Schema, model } from 'mongoose';

let validRoles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido',
};

let userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'El nombre es necesario'],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'El correo es necesario'],
	},
	password: {
		type: String,
		required: [true, 'La contraseña es obligatoria'],
	},
	img: {
		type: String,
		required: false,
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: validRoles,
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
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