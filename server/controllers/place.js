import placeService from '../services/place';

const placeController = {
	getOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.getOne(user._id, placeId, res);
	},
	getAll(req, res) {
		const { user } = req;
		placeService.getAll(user._id, res);
	},
	create(req, res) {
		const { user } = req;
		const place = req.body;
		placeService.createOne(user._id, place, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		placeService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const placeId = req.params.id;
		placeService.deleteOne(user._id, placeId, res);
	},
};

export default Object.freeze(placeController);
