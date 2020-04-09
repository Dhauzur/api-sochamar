import Joi from '@hapi/joi';

const personSchema = {
	create: Joi.object({
		avatar: Joi.string(),
		documents: Joi.array(),
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		birthdate: Joi.string(),
		state: Joi.string(),
		phone: Joi.string(),
		appointment: Joi.string(),
		function: Joi.string(),
		age: Joi.string(),
		region: Joi.string(),
		comuna: Joi.string(),
		email: Joi.string(),
		rut: Joi.string(),
		idCompany: Joi.string(),
	}),
	update: Joi.object({
		avatar: Joi.string(),
		documents: Joi.array(),
		firstName: Joi.string().required(),
		lastName: Joi.string(),
		birthdate: Joi.string(),
		state: Joi.string(),
		phone: Joi.string(),
		appointment: Joi.string(),
		function: Joi.string(),
		age: Joi.string(),
		region: Joi.string(),
		comuna: Joi.string(),
		email: Joi.string(),
		rut: Joi.string(),
		idCompany: Joi.string(),
	}),
};

export default Object.freeze(personSchema);
