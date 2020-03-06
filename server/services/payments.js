import Payments from '../models/payments';
import { pick } from 'underscore';
import { logError } from '../config/pino';

/**
 * create a new payment and return the payment
 */
const createOne = async (req, res) => {
	const { body } = req;
	try {
		let payments = new Payments({
			idLodging: body.idLodging,
			idPlace: body.idPlace,
			startDate: body.startDate,
			endDate: body.endDate,
			mount: body.mount,
		});
		if (req.file) {
			payments.voucher = {
				url: req.file.cloudStoragePublicUrl,
				name: req.file.cloudStorageObject,
			};
		}
		const paymentDB = await payments.save();
		return res.json({ status: true, payment: paymentDB });
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

/**
 * edit a payment
 */
const editOne = async (req, res) => {
	try {
		const { id } = req.params;
		let body = pick(req.body, [
			'idPlace',
			'idLodging',
			'startDate',
			'endDate',
			'mount',
		]);
		body.comments = req.body.comments;
		if (req.file) {
			body.voucher = {
				url: req.file.cloudStoragePublicUrl,
				name: req.file.cloudStorageObject,
			};
		}
		await Payments.findByIdAndUpdate(id, body);
		res.json({ status: true });
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

/**
 * get all payments of the place
 */
const getAll = async (req, res) => {
	const { id } = req.params;
	try {
		const payments = await Payments.find({ idPlace: id });
		return res.json({
			status: true,
			payments,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

/**
 * delete a person
 */
const deleteOne = async (req, res) => {
	try {
		const { id } = req.params;
		await Payments.findByIdAndRemove(id);
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const personsService = {
	createOne,
	getAll,
	editOne,
	deleteOne,
};

export default Object.freeze(personsService);
