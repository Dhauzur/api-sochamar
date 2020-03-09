import Joi from '@hapi/joi';

const paymentsSchema = {
	create: Joi.object({
		idPlace: Joi.string().required(),
		idLodging: Joi.string().required(),
		startDate: Joi.string().required(),
		endDate: Joi.string().required(),
		mount: Joi.string().required(),
	}),
	update: Joi.object({
		idPlace: Joi.string().required(),
		idLodging: Joi.string().required(),
		startDate: Joi.string(),
		endDate: Joi.string(),
		mount: Joi.string(),
		comments: Joi.string(),
		voucher: Joi.object(),
	}),
};

export default Object.freeze(paymentsSchema);
