const Company = require('../models/company');
const Lodging = require('../models/lodging');

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

const deleteOne = (req, res) => {
	let id = req.params.id;
	Company.findById(id).exec((err, companyFind) => {
		Company.deleteOne({ _id: id }, function(err, company) {
			if (err) return res.status(400).json({ ok: false, err });
			Lodging.deleteMany({ company: id }, (err, lodging) => {
				if (err)
					return res.status(400).json({
						error:
							'Error al eliminar hospedajes relacionados a compañias',
						err,
					});
				res.json({
					delete: companyFind.name,
					lodgins: lodging.deletedCount,
				});
			});
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
	deleteOne,
	deleteAll,
};

module.exports = Object.freeze(companyService);
