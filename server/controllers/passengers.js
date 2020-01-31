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
};

module.exports = Object.freeze(passengersController);
