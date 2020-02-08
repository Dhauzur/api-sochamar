const Company = require('../models/company');

const getAll = res => {
	Company.find({}).exec((err, company) => {
		if (err) return res.status(400).json({ ok: false, err });
		Company.count({}, (err, length) => {
			res.json({
				status: true,
				company,
				length,
			});
		});
	});
};

const createOne = (req, res) => {
	let body = req.body;
	let company = new Company({
		rut: body.rut,
		name: body.name,
		prices: body.prices,
	});
	company.save((err, companyDB) => {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			ok: true,
			company: companyDB,
		});
	});
};

const deleteAll = res => {
	Company.deleteMany({}, function(err, company) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: company.deletedCount,
		});
	});
};

const companyService = {
	getAll,
	createOne,
	deleteAll,
};

module.exports = Object.freeze(companyService);
