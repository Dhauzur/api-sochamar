import Joi from '@hapi/joi';

const lodgingSchema = {
	create: Joi.object({
		name: Joi.string().required(),
		group: Joi.string().required(),
		place: Joi.string().required(),
		start: Joi.string().required(),
		end: Joi.string().required(),
		room: Joi.string(),
		days: Joi.array(),
		totalDays: Joi.string(),
		person: Joi.string(),
		mountTotal: Joi.number(),
	}),
	update: Joi.object({
		name: Joi.string().required(),
		group: Joi.string().required(),
		place: Joi.string().required(),
		start: Joi.string().required(),
		end: Joi.string().required(),
		room: Joi.string(),
		days: Joi.array(),
		totalDays: Joi.string(),
		person: Joi.string(),
		mountTotal: Joi.number(),
	}),
};

export default Object.freeze(lodgingSchema);
