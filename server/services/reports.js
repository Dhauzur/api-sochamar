import Report from '../models/reports';

const getAll = res => {
	Report.find(null).exec((err, reports) => {
		if (err)
			return res.status(400).json({
				status: false,
				err,
			});

		Report.count(null, (err, length) => {
			res.json({
				status: true,
				reports: reports.reverse(),
				length,
			});
		});
	});
};

const createOne = (req, res) => {
	let body = req.body;
	let reports = new Report({
		member: body.member,
		whatWasDone: body.whatWasDone,
	});
	reports.save((err, reportsDB) => {
		if (err) {
			return res.status(400).json({
				status: false,
				err,
			});
		}
		res.json({
			status: true,
			reports: reportsDB,
		});
	});
};

const deleteAll = res => {
	Report.deleteMany({}, function(err, reports) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: reports.deletedCount,
		});
	});
};

const reportService = {
	getAll,
	createOne,
	deleteAll,
};

export default Object.freeze(reportService);
