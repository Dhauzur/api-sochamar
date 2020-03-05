import roomsService from '../services/rooms';

const roomsController = {
	getAll(req, res) {
		const { user } = req;
		const placeId = req.params.placeId;
		roomsService.getAll(user._id, placeId, res);
	},
	create(req, res) {
		const { placeId } = req.body;
		delete req.body.placeId;
		roomsService.createOne(placeId, req.body, res);
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
