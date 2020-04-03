import personsService from '../services/person';

/**
 * controller for persons
 */
const personsController = {
	create(req, res) {
		const { user } = req;
		const person = req.body;
		personsService.createOne(user._id, person, res);
	},
	getAll(req, res) {
		const { user } = req;
		personsService.getAll(user._id, res);
	},
	getOne(req, res) {
		const { id } = req.params;
		personsService.getOne(id, res);
	},
	editOne(req, res) {
		const { user } = req;
		const { id } = req.params;
		const person = req.body;
		personsService.editOne(user._id, person, id, res);
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
