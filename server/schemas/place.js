import Joi from '@hapi/joi';

const placeSchema = {
	register: Joi.object({
		name: Joi.string().required(),
		rut: Joi.string().required(),
		prices: Joi.array(),
	}),
};

export default Object.freeze(placeSchema);
