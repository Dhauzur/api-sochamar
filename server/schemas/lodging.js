import Joi from '@hapi/joi';

const lodgingSchema = {
	create: Joi.object({
		id: Joi.string(),
		group: Joi.string().required(),
		start: Joi.string().required(),
		place: Joi.string().required(),
		end: Joi.string().required(),
		service: Joi.string(),
		persons: Joi.array().allow(null),
		mountTotal: Joi.number(),
	}),
};

export default Object.freeze(lodgingSchema);
