import axios from 'axios';
import { MercadoPago, defaultPreferenceMaker } from '../config/mercadoPago';
import maker from '../utils/mercadopago/maker';

const getMerchantOrderData = async orderId => {
	return await axios.get(
		`https://api.mercadopago.com/merchant_orders/${orderId}?access_token=${process.env.MERCADOPAGO_SANDBOX_KEY}`
	);
};

const getChargeBackData = async chargeBackId => {
	return await axios.get(
		`https://api.mercadopago.com/v1/chargebacks/${chargeBackId}?access_token=${process.env.MERCADOPAGO_SANDBOX_KEY}`
	);
};

const getPaymentData = async paymentId => {
	return await axios.get(
		`https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${process.env.MERCADOPAGO_SANDBOX_KEY}`
	);
};

const smartCheckoutGenerator = async preferences => {
	return await MercadoPago.preferences.create(preferences);
};

const createPayer = userData => {
	return maker.payer(
		userData.name,
		userData.lastName || '',
		userData.email,
		{},
		{},
		{},
		null
	);
};

const createItem = itemData => {
	return maker.items(
		itemData.id,
		itemData.title,
		itemData.description,
		itemData.picture_url || '',
		itemData.items_category.name,
		itemData.items_currency.name,
		itemData.items_currency.quantity || 1,
		itemData.unitPrice
	);
};
/*
user is the payer in createPreference
items is our array of items, we need to format them into a acceptable mercadopago Item
external reference is a object or data of our system, example: id of a resource we want to unlock
when ipn notification pops, we're going to get the external_reference added in the notification
*/
const createPreference = (user, items, external_reference) => {
	const payer = createPayer(user);
	const formattedItems = items.map(item => createItem(item));

	return defaultPreferenceMaker(formattedItems, payer, external_reference);
};
/*Function to translate the 3 possible payments status into integers*/
const transformMercadoPagoStatus = mercadoPagoStatus => {
	let dbStatus = 0;
	switch (mercadoPagoStatus) {
		case 'approved':
			dbStatus = 1;
			break;
		case 'in_process':
			dbStatus = 2;
			break;
		case 'rejected':
			dbStatus = 3;
			break;
		default:
			break;
	}
	return dbStatus;
};

const mercadoPagoService = {
	createPreference,
	getChargeBackData,
	transformMercadoPagoStatus,
	getPaymentData,
	getMerchantOrderData,
	smartCheckoutGenerator,
	createPayer,
	defaultPreferenceMaker,
	createItem,
};

export default mercadoPagoService;
