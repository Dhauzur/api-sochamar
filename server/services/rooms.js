const Rooms = require('../models/rooms');

const getAll = res => {
	Rooms.find({}).exec((err, rooms) => {
		if (err) return res.status(400).json({ ok: false, err });
		Rooms.count({}, (err, length) => {
			res.json({
				status: true,
				rooms,
				length,
			});
		});
	});
};

const createOne = (req, res) => {
	let body = req.body;
	let rooms = new Rooms({
		id: body.id,
		name: body.name,
		numberPassangerMax: body.numberPassangerMax,
	});
	rooms.save((err, roomsDB) => {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			ok: true,
			rooms: roomsDB,
		});
	});
};

const deleteAll = res => {
	Rooms.deleteMany({}, function(err, lodging) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: lodging.deletedCount,
		});
	});
};

const roomsService = {
	getAll,
	createOne,
	deleteAll,
};

module.exports = Object.freeze(roomsService);
