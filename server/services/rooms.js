import Rooms from '../models/rooms';

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

const deleteOne = (companyId, roomId, res) => {
	Rooms.findOneAndDelete(
		{ _id: roomId, company: companyId },
		{ projection: 'name' }
	)
		.then(room => res.json(room))
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
