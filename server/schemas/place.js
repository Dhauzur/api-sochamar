import Joi from '@hapi/joi';

const placeSchema = {
	register: Joi.object({
		name: Joi.string().required(),
		rut: Joi.string().required(),
		services: Joi.array().items(
			Joi.object({
				name: Joi.string().required(),
				price: Joi.number().required(),
			})
		),
	}),
	addService: Joi.object({
		name: Joi.string().required(),
		price: Joi.number().required(),
	}),
	updateService: Joi.object({
		_id: Joi.string(),
		name: Joi.string(),
		price: Joi.number(),
	}),
};

export default Object.freeze(placeSchema);
