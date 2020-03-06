import Joi from '@hapi/joi';

const activitiesSchema = {
	create: Joi.object({
		workPlace: Joi.string().required(),
		whatWasDone: Joi.array().required(),
		ncamas: Joi.integer().required(),
		state: Joi.boolean(),
	}),
};

export default Object.freeze(activitiesSchema);
