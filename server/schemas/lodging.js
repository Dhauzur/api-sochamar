import Joi from '@hapi/joi';

const lodgingSchema = {
	create: Joi.object({
		id: Joi.string(),
		group: Joi.string().required(),
		start: Joi.string().required(),
		place: Joi.string().required(),
		end: Joi.string().required(),
		days: Joi.array(),
		persons: Joi.array().allow(null),
		mountTotal: Joi.number(),
		content: Joi.string(),
	}),
};

export default Object.freeze(lodgingSchema);
