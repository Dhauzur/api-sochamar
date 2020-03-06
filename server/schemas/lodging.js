import Joi from '@hapi/joi';

const lodgingSchema = {
	create: Joi.object({
		id: Joi.string().required(),
		group: Joi.string().required(),
		start: Joi.string().required(),
		place: Joi.string().required(),
		end: Joi.string().required(),
		service: Joi.array().required(),
		persons: Joi.array(),
		mountTotal: Joi.number(),
	}),
};

export default Object.freeze(lodgingSchema);
