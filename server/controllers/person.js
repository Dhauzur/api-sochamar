import personsService from '../services/person';

/**
 * controller for persons
 */
const personsController = {
	create(req, res) {
		const { user, body } = req;
		personsService.createOne(user._id, body, res);
	},
	getAll(req, res) {
		const { user } = req;
		personsService.getAll(user._id, res);
	},
	editOne(req, res) {
		const { user, body } = req;
		const { id } = req.params;
		personsService.editOne(user._id, body, id, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		personsService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		personsService.deleteOne(user._id, id, res);
	},
};

export default Object.freeze(personsController);
