import Rooms from '../models/rooms';
import Lodging from '../models/lodging';

const getAll = (companyId, res) => {
	Rooms.find({ company: companyId }).exec((err, rooms) => {
		if (err) return res.status(400).json({ ok: false, err });
		Rooms.countDocuments({}, (err, length) => {
			res.json({
				status: true,
				rooms,
				length,
			});
		});
	});
};

const createOne = (companyId, room, res) => {
	let rooms = new Rooms(room);
	rooms.company = companyId;
	rooms.save((err, roomsDB) => {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			ok: true,
			rooms: roomsDB,
		});
	});
};

const deleteOne = (companyId, req, res) => {
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

const deleteOne2 = (companyId, roomId, res) => {
	Rooms.findOneAndDelete({ _id: roomId, company: companyId })
		.then(() => res.sendStatus(200))
		.catch(() => res.sendStatus(400));
};

const deleteAll = (companyId, res) => {
	Rooms.deleteMany({ company: companyId }, function(err, roomsDB) {
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
