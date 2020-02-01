const roomsService = require('../services/rooms');

const roomsController = {
	getAll(req, res) {
		roomsService.getAll(res);
	},
	create(req, res) {
		roomsService.createOne(req, res);
	},
	deleteAll(req, res) {
		roomsService.deleteAll(res);
	},
};

module.exports = Object.freeze(roomsController);