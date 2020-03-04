import Lodging from '../models/lodging';
import Company from '../models/company';
import moment from 'moment';
import { logError } from '../config/pino';

const getAll = res => {
	Lodging.find({}).exec((err, lodgings) => {
		if (err) return res.status(400).json({ ok: false, err });
		Lodging.countDocuments({}, (err, length) => {
			res.json({
				status: true,
				lodgings,
				length,
			});
		});
	});
};

//Ojo esto deberia ser updateOne
const createOne = async (req, res) => {
	try {
		let { body } = req;

		// set mount total
		let breakfast = 0,
			lunch = 0,
			dinner = 0,
			lodging = 0;
		let service = JSON.parse(body.service);
		const responseDB = await Company.find({ _id: body.company });
		const prices = responseDB[0].prices;
		service.map(arr => {
			arr.filter((item, index) => {
				if (index === 0) breakfast = breakfast + item;
				if (index === 1) lunch = lunch + item;
				if (index === 2) dinner = dinner + item;
				if (index === 3) lodging = lodging + item;
			});
		});
		const mountTotal =
			lodging * prices[3] +
			dinner * prices[2] +
			lunch * prices[1] +
			breakfast * prices[0];

		// save in database
		const lodgingDB = await Lodging.findOneAndUpdate(
			{ id: body.id },
			{
				group: body.group,
				start: moment(body.start)
					.hours(16)
					.format('YYYY-MM-DD'),
				end: moment(body.end)
					.hours(12)
					.format('YYYY-MM-DD'),
				service: body.service,
				company: body.company,
				passengers: body.passengers,
				mountTotal,
			},
			{ upsert: true }
		);
		res.json({
			status: true,
			lodging: lodgingDB,
		});
	} catch (error) {
		logError(error.message);
		res.status(400).json({ status: false, error: error.message });
	}
};

const deleteAll = res => {
	Lodging.deleteMany({}, function(err, lodging) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			delete: true,
			deletedCount: lodging.deletedCount,
		});
	});
};

const deleteAllWithCompany = (req, res) => {
	let company = req.params.company;
	Lodging.deleteMany({ company }, function(err, lodging) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			delete: true,
			deletedCount: lodging.deletedCount,
		});
	});
};

const deleteOneWithCompanyId = (req, res) => {
	let id = req.params.id;
	Lodging.deleteMany({ id }, function(err, lodging) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			delete: true,
			deletedCount: lodging.deletedCount,
		});
	});
};

/**
 * search all lodgings for idcompany
 */
const getAllForCompany = async (req, res) => {
	try {
		const lodgings = await Lodging.find({
			company: req.params.id,
		});
		const count = await Lodging.countDocuments({ company: req.params.id });
		res.json({
			status: true,
			count,
			lodgings,
		});
	} catch (error) {
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const lodgingService = {
	getAll,
	createOne,
	deleteAll,
	getAllForCompany,
	deleteAllWithCompany,
	deleteOneWithCompanyId,
};

export default Object.freeze(lodgingService);
