import passengersService from '../services/passengers';

/**
 * controller for passengers
 */
const passengersController = {
	create(req, res) {
		const { user } = req;
		passengersService.createOne(user._id, req, res);
	},
	getAll(req, res) {
		const { user } = req;
		passengersService.getAll(user._id, res);
	},
	editOne(req, res) {
		const { user } = req;
		passengersService.editOne(user._id, req, res);
	},
	deleteAll(req, res) {
		const { user } = req;
		passengersService.deleteAll(user._id, res);
	},
	deleteOne(req, res) {
		const { user } = req;
		passengersService.deleteOne(user._id, req, res);
	},
};

export default Object.freeze(passengersController);
