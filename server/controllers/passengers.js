const passengersService = require('../services/passengers');

/**
 * controller for passengers
 */
const passengersController = {
	create(req, res) {
		passengersService.createOne(req, res);
	},
	getAll(req, res) {
		passengersService.getAll(res);
	},
	editOne(req, res) {
		passengersService.editOne(req, res);
	},
	deleteAll(req, res) {
		passengersService.deleteAll(res);
	},
	deleteOne(req, res) {
		passengersService.deleteOne(req, res);
	},
};

module.exports = Object.freeze(passengersController);
