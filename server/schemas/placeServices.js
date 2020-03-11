import Joi from '@hapi/joi';

const placeServicesSchema = {
	create: Joi.object({
		placeId: Joi.string().required(),
		name: Joi.string().required(),
		price: Joi.number().required(),
	}),
	update: Joi.object({
		name: Joi.string(),
		price: Joi.number(),
	}),
};

export default Object.freeze(placeServicesSchema);
