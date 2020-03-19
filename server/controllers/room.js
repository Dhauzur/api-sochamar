import roomsService from '../services/rooms';

const roomsController = {
	getAll(req, res) {
		const { user } = req;
		const { placeId } = req.params;
		roomsService.getAll(user._id, placeId, res);
	},
	create(req, res) {
		const { placeId } = req.body;
		delete req.body.placeId;
		const period = req.body;
		roomsService.createOne(placeId, period, res);
	},
	deleteOne(req, res) {
		const { id } = req.params;
		const { placeId } = req.body;
		roomsService.deleteOne(placeId, id, res);
	},
	deleteAll(req, res) {
		const { placeId } = req.body;
		roomsService.deleteAll(placeId, res);
	},
};

export default Object.freeze(roomsController);
