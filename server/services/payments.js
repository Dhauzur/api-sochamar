import Payments from '../models/payments';
import { logError, logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';

/**
 * create a new payment and return the payment
 */
const createOne = async (user, payment, file, res) => {
	try {
		let payments = new Payments(payment);
		if (file) {
			payments.voucher = {
				url: file.cloudStoragePublicUrl,
				name: file.cloudStorageObject,
			};
		}
		const paymentDB = await payments.save();
		logInfo(
			infoMessages(user.email, 'registro', 'un', 'payment', paymentDB)
		);
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
const editOne = async (user, paymentId, comments, res) => {
	try {
		const updatedPayment = await Payments.findByIdAndUpdate(
			paymentId,
			comments
		);
		logInfo(
			infoMessages(
				user.email,
				'actualizo',
				'un',
				'payment',
				updatedPayment
			)
		);
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
const getAll = async (user, req, res) => {
	const { id } = req.params;
	try {
		const payments = await Payments.find({ idPlace: id });
		logInfo(infoMessages(user.email, 'obtuvo', 'todos los', 'payment'));
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
const deleteOne = async (user, req, res) => {
	try {
		const { id } = req.params;
		const deletedPayment = await Payments.findByIdAndRemove(id);
		logInfo(
			infoMessages(user.email, 'elimino', 'un', 'payment', deletedPayment)
		);
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

const generatePdfReport = async res => {
	const foundPayments = await Payments.find();
	ejs.renderFile(
		'./server/templates/payment-template.ejs',
		{ payments: foundPayments },
		(err, data) => {
			if (err) {
				logError(err.message);
				res.sendStatus(400);
			} else {
				createPdfWithStreamAndSendResponse(data, res);
			}
		}
	);
};

const personsService = {
	generatePdfReport,
	createOne,
	getAll,
	editOne,
	deleteOne,
};

export default Object.freeze(personsService);
