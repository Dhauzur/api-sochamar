import Joi from '@hapi/joi';

const periodSchema = {
	create: Joi.object({
		name: Joi.string().required(),
		numberPassangerMax: Joi.number().required(),
		placeId: Joi.string().required(),
	}),
};

export default Object.freeze(periodSchema);
