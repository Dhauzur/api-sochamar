import periodService from '../services/period';

const periodController = {
	getAll(req, res) {
		const { user } = req;
		const { placeId } = req.params;
		periodService.getAll(user._id, placeId, res);
	},
	create(req, res) {
		const { placeId } = req.body;
		delete req.body.placeId;
		periodService.createOne(placeId, req.body, res);
	},
	deleteOne(req, res) {
		const { id } = req.params;
		const { placeId } = req.body;
		periodService.deleteOne(placeId, id, res);
	},
	deleteAll(req, res) {
		const { placeId } = req.body;
		periodService.deleteAll(placeId, res);
	},
};

export default Object.freeze(periodController);
