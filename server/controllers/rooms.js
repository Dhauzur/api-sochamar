import roomsService from '../services/rooms';

const roomsController = {
	getAll(req, res) {
		const { user } = req;
		const companyId = req.params.companyId;
		roomsService.getAll(user._id, companyId, res);
	},
	create(req, res) {
		const { companyId } = req.body;
		delete req.body.companyId;
		roomsService.createOne(companyId, req.body, res);
	},
	deleteOne(req, res) {
		const { id } = req.params;
		const { companyId } = req.body;
		roomsService.deleteOne(companyId, id, res);
	},
	deleteAll(req, res) {
		const { companyId } = req.body;
		roomsService.deleteAll(companyId, res);
	},
};

export default Object.freeze(roomsController);
