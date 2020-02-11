const Lodging = require('../models/lodging');
const moment = require('moment');

const getAll = res => {
	Lodging.find({}).exec((err, lodgings) => {
		if (err) return res.status(400).json({ ok: false, err });
		Lodging.count({}, (err, length) => {
			res.json({
				status: true,
				lodgings,
				length,
			});
		});
	});
};

//Ojo esto deberia ser updateOne
const createOne = (req, res) => {
	let body = req.body;
	// let lodging = new Lodging({
	//     id: body.id,
	//     group: body.group,
	//     start: moment(body.start).hours(16).format('YYYY-MM-DD'),
	//     end: moment(body.end).hours(12).format('YYYY-MM-DD'),
	//     service: body.service,
	//     company: body.company,
	// });
	Lodging.findOneAndUpdate(
		{
			id: body.id,
		},
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
		},
		{
			upsert: true,
		},
		(err, lodgingDB) => {
			if (err) return res.status(400).json({ ok: false, err });
			res.json({
				status: true,
				lodging: lodgingDB,
			});
		}
	);
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

const lodgingService = {
	getAll,
	createOne,
	deleteAll,
	deleteAllWithCompany,
	deleteOneWithCompanyId,
};

module.exports = Object.freeze(lodgingService);
