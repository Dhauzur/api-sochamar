import Activities from '../models/activities';

const getAll = res => {
	Activities.find(null).exec((err, activities) => {
		if (err)
			return res.status(400).json({
				status: false,
				err,
			});

		Activities.count(null, (err, length) => {
			res.json({
				status: true,
				activities: activities.reverse(),
				length,
			});
		});
	});
};

const createOne = (req, res) => {
	let body = req.body;
	let activities = new Activities({
		workPlace: body.workPlace,
		whatWasDone: body.whatWasDone,
		ncamas: body.ncamas,
		date: body.date,
	});
	activities.save((err, activitiesDB) => {
		if (err) {
			return res.status(400).json({
				status: false,
				err,
			});
		}
		res.json({
			status: true,
			activities: activitiesDB,
		});
	});
};

const deleteAll = res => {
	Activities.deleteMany({}, function(err, activities) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: activities.deletedCount,
		});
	});
};

const activitiesService = {
	getAll,
	createOne,
	deleteAll,
};

export default Object.freeze(activitiesService);
