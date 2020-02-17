import Payments from '../models/payments';
import { pick } from 'underscore';

/**
 * create a new payment and return the payment
 */
const createOne = async (req, res) => {
	const { body } = req;
	try {
		let payments = new Payments({
			idCompany: body.idCompany,
			startDate: body.startDate,
			endDate: body.endDate,
			mount: body.mount,
		});
		if (req.files.voucher) {
			payments.voucher = req.files.voucher[0].originalname;
		}
		const paymentDB = await payments.save();
		return res.json({ status: true, payment: paymentDB });
	} catch (error) {
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
			'idCompany',
			'startDate',
			'endDate',
			'mount',
		]);
		body.comments = req.body.comments;
		if (req.files.voucher) {
			body.voucher = req.files.vouver[0].originalname;
		}
		const paymentsDB = await Payments.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});
		res.json({
			status: true,
			payments: paymentsDB,
		});
	} catch (error) {
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

/**
 * get all payments of the company
 */
const getAll = async (req, res) => {
	const { id } = req.params;
	try {
		const payments = await Payments.find({ idCompany: id });
		return res.json({
			status: true,
			payments,
		});
	} catch (error) {
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

/**
 * delete a passenger
 */
const deleteOne = async (req, res) => {
	try {
		let { id } = req.params;
		await Payments.findByIdAndRemove(id);
		res.json({
			status: true,
		});
	} catch (error) {
		if (error) {
			return res.status(400).send({
				status: false,
				error: error.message,
			});
		}
	}
};

/**
 * delete all payments
 */
const deleteAll = async res => {
	try {
		await Payments.deleteMany({});
		return res.json({
			status: true,
		});
	} catch (error) {
		return res.status(400).send({ status: false, error: error.message });
	}
};

const passengersService = {
	createOne,
	getAll,
	editOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(passengersService);
