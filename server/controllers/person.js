import personsService from '../services/person';

/**
 * controller for persons
 */
const personsController = {
	create(req, res) {
		const person = req.body;
		personsService.createOne(person, res);
	},
	getAll(req, res) {
		const { user } = req;
		personsService.getAll(user._id, res);
	},
	getPersonsCompany(req, res) {
		const { idCompany } = req.params;
		personsService.getPersonsCompany(idCompany, res);
	},
	getOne(req, res) {
		const { id } = req.params;
		personsService.getOne(id, res);
	},
	patchRequest(req, res) {
		const data = req.body;
		personsService.patchRequest(data, res);
	},
	patchConversation(req, res) {
		const data = req.body;
		personsService.patchConversation(data, res);
	},
	editOne(req, res) {
		const { id } = req.params;
		const person = req.body;
		personsService.editOne(person, id, res);
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
