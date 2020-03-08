import Joi from '@hapi/joi';

const periodSchema = {
	create: Joi.object({
		id: Joi.String().required(),
		name: Joi.String().required(),
		numberPassangerMax: Joi.number().required(),
		placeId: Joi.String().required(),
	}),
};

export default Object.freeze(periodSchema);
