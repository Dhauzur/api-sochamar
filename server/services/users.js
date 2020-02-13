const _ = require('underscore');
const User = require('../models/user');

const getAll = res => {
	User.find({ estado: true }, 'nombre email role estado google img').exec(
		(err, Users) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err,
				});
			User.count({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					Users,
					cuantos: conteo,
				});
			});
		}
	);
};

const editOne = (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
	User.findByIdAndUpdate(
		id,
		body,
		{ new: true, runValidators: true },
		(err, UserDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err,
				});
			res.json({
				ok: true,
				User: UserDB,
			});
		}
	);
};

const deleteOne = (req, res) => {
	let id = req.params.id;
	// User.findByIdAndRemove(id, (err, UserBorrado) => {
	let cambiaEstado = {
		estado: false,
	};
	User.findByIdAndUpdate(
		id,
		cambiaEstado,
		{ new: true },
		(err, DeletedUser) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err,
				});
			if (!DeletedUser)
				return res.status(400).json({
					ok: false,
					err: {
						message: 'User no encontrado',
					},
				});
			res.json({
				ok: true,
				User: DeletedUser,
			});
		}
	);
};

const deleteAll = res => {
	User.deleteMany({}, function(err, users) {
		if (err) return res.status(400).json({ ok: false, err });
		res.json({
			deleteAll: true,
			deletedCount: users.deletedCount,
		});
	});
};

const generateProfile = user => {
	return {
		name: user.name,
		lastName: user.lastName,
		img: user.img || '',
	};
};

const sendProfile = (user, res) => {
	const profile = generateProfile(user);
	return res.json(profile);
};

const getProfile = (user, res) => {
	User.findOne({ _id: user._id }).then(data => sendProfile(data, res));
};

const updateProfile = (user, profile, res) => {
	User.findByIdAndUpdate(user._id, profile, {
		new: true,
		runValidators: true,
	})
		.then(() => res.sendStatus(201))
		.catch(err => res.status(400).json(err));
};

const UsersService = {
	getAll,
	deleteAll,
	editOne,
	deleteOne,
	getProfile,
	updateProfile,
};

module.exports = Object.freeze(UsersService);
