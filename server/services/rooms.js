import Rooms from '../models/rooms';
import Lodging from '../models/lodging';

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

const deleteOne = (req, res) => {
	let id = req.params.id;
	Rooms.findById(id).exec((err, roomFind) => {
		Rooms.deleteOne({ id }, function(err) {
			if (err) return res.status(400).json({ ok: false, err });
			Lodging.deleteMany({ group: id }, (err, lodging) => {
				if (err)
					return res.status(400).json({
						error:
							'Error al eliminar hospedajes relacionados a la habitación',
						err,
					});
				res.json({
					delete: roomFind.name,
					lodgins: lodging.deletedCount,
				});
			});
		});
	});
};

const deleteAll = res => {
	Rooms.deleteMany({}, function(err, roomsDB) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: roomsDB.deletedCount,
		});
	});
};

const roomsService = {
	getAll,
	createOne,
	deleteOne,
	deleteAll,
};

export default Object.freeze(roomsService);
