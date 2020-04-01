import Joi from '@hapi/joi';

const userSchema = {
	updateProfile: Joi.object({
		name: Joi.string(),
		lastName: Joi.string(),
		role: Joi.string(),
	}),
	updatePassword: Joi.object({
		password: Joi.string()
			.min(5)
			.max(100)
			.required(),
	}),
};

export default Object.freeze(userSchema);
