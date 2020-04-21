import Payments from '../models/payments';
import { logInfo } from '../config/pino';
import { infoMessages } from '../utils/logger/infoMessages';
import ejs from 'ejs';
import { createPdfWithStreamAndSendResponse } from '../utils/pdf/createToStream';
import fs from 'fs';
import { errorCallback } from '../utils/functions/errorCallback';
import { errorResponse } from '../utils/responses/errorResponse';
const csv = require('fast-csv');

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
	} catch (e) {
		errorCallback(e, res);
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
	} catch (err) {
		errorCallback(err, res);
	}
};
/*Search payments with a placeId*/
const searchAllWithPlaceId = async placeId => {
	return await Payments.find({ idPlace: placeId });
};
/**
 * get all payments of the place
 */
const getAll = async (user, req, res) => {
	const { id } = req.params;
	try {
		const payments = await searchAllWithPlaceId(id);
		logInfo(
			infoMessages(
				user.email,
				'obtuvo',
				'todos los',
				'payment',
				payments,
				'con placeId'
			)
		);
		return res.json({
			status: true,
			payments,
		});
	} catch (e) {
		errorCallback(e, res);
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
	} catch (e) {
		errorCallback(e, res);
	}
};

const generatePdfReport = async (placeId, res) => {
	const foundPayments = await searchAllWithPlaceId(placeId);
	ejs.renderFile(
		'./server/templates/payment-template.ejs',
		{ payments: foundPayments },
		(err, data) => {
			if (err) {
				errorCallback(err, res);
			} else {
				createPdfWithStreamAndSendResponse(data, res);
			}
		}
	);
};

const generateCsvReport = async res => {
	const foundPayments = await Payments.find();
	const ws = fs.createWriteStream('out.csv');
	csv.write(foundPayments, { headers: true })
		.pipe(ws)
		.on('data', row => {
			console.log(row);
		})
		.on('end', data => {});
};

const personsService = {
	generatePdfReport,
	createOne,
	getAll,
	editOne,
	deleteOne,
	generateCsvReport,
};

export default Object.freeze(personsService);
