const passengersService = require('../services/passengers');

/**
 * controller for passengers
 */
const passengersController = {
	create(req, res, createAt) {
		passengersService.createOne(req, res, createAt);
	},
	getAll(req, res) {
		passengersService.getAll(res);
	},
};

module.exports = Object.freeze(passengersController);
