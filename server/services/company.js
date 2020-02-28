import Company from '../models/company';
import Lodging from '../models/lodging';

const getOne = (userId, companyId, res) => {
	Company.findOne({ _id: companyId, users: { $in: userId } }).exec(
		(err, company) => {
			if (err) return res.status(400).json({ status: false, err });
			res.json({
				status: true,
				company,
			});
		}
	);
};

const getAll = (userId, res) => {
	Company.find({ users: { $in: userId } }).exec((err, company) => {
		if (err) return res.status(400).json({ ok: false, err });
		Company.countDocuments({}, (err, length) => {
			res.json({
				status: true,
				company,
				length,
			});
		});
	});
};

const createOne = (userId, company, res) => {
	const newCompany = new Company(company);
	newCompany.users.push(userId);
	newCompany.save((err, companyDB) => {
		if (err) return res.status(400).json({ err });
		res.json({
			ok: true,
			company: companyDB,
		});
	});
};

const deleteOne = (userId, companyId, res) => {
	Company.findOne({ _id: companyId, users: { $in: userId } }).exec(
		(err, companyFind) => {
			Company.deleteOne({ _id: companyId }, function(err) {
				if (err) return res.status(400).json({ ok: false, err });
				Lodging.deleteMany({ company: companyId }, (err, lodging) => {
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
		}
	);
};

const deleteAll = (userId, res) => {
	Company.deleteMany({ users: { $in: userId } }, function(err, company) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: company.deletedCount,
		});
	});
};

const getCompaniesIds = userId => {
	return Company.find({ users: { $in: userId } }).then(companies =>
		companies.map(x => x._id)
	);
};

const companyService = {
	getOne,
	getAll,
	createOne,
	deleteOne,
	deleteAll,
	getCompaniesIds,
};

export default Object.freeze(companyService);
