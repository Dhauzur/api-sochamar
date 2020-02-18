import activitiesService from '../services/activities';

const activitiesController = {
	getAll(req, res) {
		activitiesService.getAll(res);
	},
	create(req, res) {
		activitiesService.createOne(req, res);
	},
	deleteAll(req, res) {
		activitiesService.deleteAll(res);
	},
};

export default Object.freeze(activitiesController);
