import Joi from '@hapi/joi';

const authSchema = {
	register: Joi.object({
		name: Joi.string()
			.min(5)
			.max(100)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.min(5)
			.max(100)
			.required(),
		analyst: Joi.boolean(),
	}),
	login: Joi.object({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.min(5)
			.max(100)
			.required(),
	}),
};

export default Object.freeze(authSchema);
