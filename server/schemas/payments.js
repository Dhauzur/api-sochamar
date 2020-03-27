import Joi from '@hapi/joi';

const paymentsSchema = {
	create: Joi.object({
		idPlace: Joi.string().required(),
		idLodging: Joi.string(),
		startDate: Joi.string().required(),
		endDate: Joi.string().required(),
		mount: Joi.string().required(),
		voucher: Joi.string(),
	}),
	update: Joi.object({
		comments: Joi.array(),
	}),
};

export default Object.freeze(paymentsSchema);
