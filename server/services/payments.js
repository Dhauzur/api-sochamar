import Payments from '../models/payments';
import { logError } from '../config/pino';

/**
 * create a new payment and return the payment
 */
const createOne = async (payment, file, res) => {
	try {
		let payments = new Payments(payment);
		if (file) {
			payments.voucher = {
				url: file.cloudStoragePublicUrl,
				name: file.cloudStorageObject,
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
const editOne = async (paymentId, comments, res) => {
	try {
		await Payments.findByIdAndUpdate(paymentId, comments);
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
