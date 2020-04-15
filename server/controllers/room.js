import roomsService from '../services/rooms';

const roomsController = {
	getAll(req, res) {
		const { user } = req;
		const { placeId } = req.params;
		roomsService.getAll(user, placeId, res);
	},
	create(req, res) {
		const { user } = req;
		const { placeId } = req.body;
		delete req.body.placeId;
		const period = req.body;
		roomsService.createOne(user, placeId, period, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		const { placeId } = req.body;
		roomsService.deleteOne(user, placeId, id, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		const { placeId } = req.body;
		roomsService.deleteAll(user, placeId, res);
	},
};

export default Object.freeze(roomsController);
