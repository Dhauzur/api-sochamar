import activitiesService from '../services/activities';

const activitiesController = {
	getAll(req, res) {
		activitiesService.getAll(res);
	},
	create(req, res) {
		const { body } = req;
		activitiesService.createOne(body, res);
	},
	deleteAll(req, res) {
		activitiesService.deleteAll(res);
	},
};

export default Object.freeze(activitiesController);
