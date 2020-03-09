import activitiesService from '../services/activities';

const activitiesController = {
	getAll(req, res) {
		activitiesService.getAll(res);
	},
	create(req, res) {
		const place = req.body;
		activitiesService.createOne(place, res);
	},
	deleteAll(req, res) {
		activitiesService.deleteAll(res);
	},
};

export default Object.freeze(activitiesController);
