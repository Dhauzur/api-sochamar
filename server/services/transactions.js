import mercadoPagoService from './mercadopago';
import { errorCallback } from '../utils/functions/errorCallback';
import { getResponse } from '../utils/responses/getResponse';

//We finish the transaction updating our transaction model here
const finishTransactions = async (paymentStatus, transactionId) => {
	console.log(paymentStatus);
	console.log(transactionId);
};
//first transform the payments status to integer, then finish the transactions updating the collection
const managePaymentTransaction = async (payment, res) => {
	try {
		const dbStatus = mercadoPagoService.transformMercadoPagoStatus(
			payment.status
		);

		await finishTransactions(dbStatus, payment.external_reference);
	} catch (e) {
		errorCallback(e, res);
	}
};

const managePaymentNotification = async (paymentId, res) => {
	try {
		const paymentData = await mercadoPagoService.getPaymentData(paymentId);
		await managePaymentTransaction(paymentData, res);
		res.sendStatus(200);
	} catch (e) {
		errorCallback(e, res);
	}
};

const handleChargeBackNotification = async (chargeBackId, res) => {
	try {
		const chargeBack = await mercadoPagoService.getChargeBackData(
			chargeBackId
		);
		res.sendStatus(200);
		//if a chargeback appears on certain payment, we need to change our user unlock state and change the payment status too
	} catch (e) {
		errorCallback(e, res);
	}
};

const handleMerchantOrderNotification = () => {};

const handleMercadoPagoNotification = async (
	notificationId,
	notificationType
) => {
	switch (notificationType) {
		case 'payment':
			await managePaymentNotification(notificationId);
			break;
		case 'chargeback':
			await handleChargeBackNotification(notificationId);
			break;
		case 'merchant_order':
			handleMerchantOrderNotification();
			break;
		default:
			break;
	}
};

const startMercadoPagoTransaction = async (user, items, unlockId, res) => {
	const preference = await mercadoPagoService.createPreference(
		user,
		items,
		unlockId
	);
	const mercadoPagoResponse = await mercadoPagoService.smartCheckoutGenerator(
		preference
	);
	const preferenceId = mercadoPagoResponse.body.id;
	//our transaction logic goes here, we add the preferenceId in our transaction model
	const preferenceUrl = mercadoPagoResponse.body.init_point.toString();
	getResponse('preferenceUrl', preferenceUrl, res);
};

const transactionService = {
	handleMercadoPagoNotification,
	startMercadoPagoTransaction,
};

export default transactionService;
