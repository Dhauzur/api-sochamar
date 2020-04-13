import personsService from '../services/person';

/**
 * controller for persons
 */
const personsController = {
	create(req, res) {
		const { user } = req;
		const person = req.body;
		personsService.createOne(user, person, res);
	},
	getAll(req, res) {
		const { user } = req;
		personsService.getAll(user, res);
	},
	editOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		const person = req.body;
		personsService.editOne(user, person, id, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		personsService.deleteAll(user, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		personsService.deleteOne(user, id, res);
	},
};

export default Object.freeze(personsController);
