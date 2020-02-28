import Rooms from '../models/rooms';
import companyService from './company';

const getAll = (userId, companyId, res) => {
	/*Si no existe id de compañia, significa que el frontend esta usando 'Todas las compañias'*/
	if (companyId === 'null') {
		/*Entonces buscamos todas las compañias del usuario*/
		const userCompanies = companyService.getCompaniesIds(userId);
		/*Para luego devolver todos los cuartos que tengan esas ids*/
		const findRoomsFromTheseCompanies = companies => {
			Rooms.find({ company: { $in: companies } })
				.then(rooms =>
					res.json({
						status: true,
						rooms,
					})
				)
				.catch(e => res.status(400).json({ ok: false, e }));
		};
		userCompanies.then(companies => findRoomsFromTheseCompanies(companies));
	} else {
		Rooms.find({ company: companyId })
			.then(rooms =>
				res.json({
					status: true,
					rooms,
				})
			)
			.catch(e => res.status(400).json({ ok: false, e }));
	}
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
