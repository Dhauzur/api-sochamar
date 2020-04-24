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
		totalDays: Joi.number(),
		person: Joi.string(),
		mountTotal: Joi.number(),
		calendar: Joi.array(),
	}),
	update: Joi.object({
		name: Joi.string().required(),
		group: Joi.string().required(),
		place: Joi.string().required(),
		start: Joi.string().required(),
		end: Joi.string().required(),
		room: Joi.string(),
		days: Joi.array(),
		totalDays: Joi.number(),
		person: Joi.string(),
		mountTotal: Joi.number(),
		calendar: Joi.array(),
	}),
};

export default Object.freeze(lodgingSchema);
