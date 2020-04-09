import Joi from '@hapi/joi';

const reportsSchema = {
	create: Joi.object({
		member: Joi.string().required(),
		whatWasDone: Joi.string().required(),
		date: Joi.date(),
		state: Joi.boolean(),
	}),
};

export default Object.freeze(reportsSchema);
