const payer = (
	name,
	surname,
	email,
	phone,
	identification,
	address,
	date_created
) => ({
	name,
	surname,
	email,
	phone,
	identification,
	address,
	date_created,
});
const items = (
	id,
	title,
	description,
	picture_url,
	category_id,
	currency_id,
	quantity,
	unit_price
) => ({
	id,
	title,
	description,
	picture_url,
	category_id,
	quantity,
	currency_id,
	unit_price,
});
const backUrl = (success, failure, pending) => ({
	success,
	failure,
	pending,
});

export default {
	payer,
	items,
	backUrl,
};
