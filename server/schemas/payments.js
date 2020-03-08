import Joi from '@hapi/joi';

const paymentsSchema = {
	create: Joi.object({
		idPlace: Joi.String().required(),
		idLodging: Joi.String().required(),
		startDate: Joi.String().required(),
		endDate: Joi.String().required(),
		mount: Joi.String().required(),
		voucher: Joi.object().required(),
		comments: Joi.String().required(),
	}),
	update: Joi.object({
		idPlace: Joi.String().required(),
		idLodging: Joi.String().required(),
		startDate: Joi.String(),
		endDate: Joi.String(),
		mount: Joi.String(),
	}),
};

export default Object.freeze(paymentsSchema);
