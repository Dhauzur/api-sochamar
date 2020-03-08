import Joi from '@hapi/joi';

const personSchema = {
	create: Joi.object({
		avatar: Joi.String(),
		documents: Joi.Array().required(),
		firstName: Joi.String().required(),
		lastName: Joi.String().required(),
		birthdate: Joi.String().required(),
		state: Joi.String().required(),
		phone: Joi.String().required(),
		appointment: Joi.String().required(),
		function: Joi.String().required(),
		age: Joi.String().required(),
		region: Joi.String().required(),
		comuna: Joi.String().required(),
	}),
	update: Joi.object({
		avatar: Joi.String(),
		documents: Joi.Array(),
		firstName: Joi.String(),
		lastName: Joi.String(),
		birthdate: Joi.String(),
		state: Joi.String(),
		phone: Joi.String(),
		appointment: Joi.String(),
		function: Joi.String(),
		age: Joi.String(),
		region: Joi.String(),
		comuna: Joi.String(),
	}),
};

export default Object.freeze(personSchema);
