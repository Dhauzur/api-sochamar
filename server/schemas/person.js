import Joi from '@hapi/joi';

const personSchema = {
	create: Joi.object({
		avatar: Joi.string(),
		documents: Joi.array().items(Joi.binary()),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		birthdate: Joi.string().required(),
		state: Joi.string().required(),
		phone: Joi.string().required(),
		appointment: Joi.string().required(),
		function: Joi.string().required(),
		age: Joi.string().required(),
		region: Joi.string().required(),
		comuna: Joi.string().required(),
	}),
	update: Joi.object({
		avatar: Joi.string(),
		documents: Joi.array().items(Joi.binary()),
		firstName: Joi.string(),
		lastName: Joi.string(),
		birthdate: Joi.string(),
		state: Joi.string(),
		phone: Joi.string(),
		appointment: Joi.string(),
		function: Joi.string(),
		age: Joi.string(),
		region: Joi.string(),
		comuna: Joi.string(),
	}),
};

export default Object.freeze(personSchema);
