import personsService from '../services/person';

/**
 * controller for persons
 */
const personsController = {
	create(req, res) {
		const { user } = req;
		personsService.createOne(user._id, req, res);
	},
	getAll(req, res) {
		const { user } = req;
		personsService.getAll(user._id, res);
	},
	editOne(req, res) {
		const { user } = req;
		personsService.editOne(user._id, req, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		personsService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		personsService.deleteOne(user._id, req, res);
	},
};

export default Object.freeze(personsController);
