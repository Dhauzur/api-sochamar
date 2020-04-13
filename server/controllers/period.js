import periodService from '../services/period';

const periodController = {
	getAll(req, res) {
		const { user } = req;
		const { placeId } = req.params;
		periodService.getAll(user, placeId, res);
	},
	create(req, res) {
		const { user } = req;
		const { placeId } = req.body;
		delete req.body.placeId;
		const period = req.body;
		periodService.createOne(user, placeId, period, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		const { placeId } = req.body;
		periodService.deleteOne(user, placeId, id, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		const { placeId } = req.body;
		periodService.deleteAll(user, placeId, res);
	},
};

export default Object.freeze(periodController);
