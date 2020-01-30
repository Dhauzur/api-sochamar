const bcrypt = require('bcrypt');
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

const createOne = (user, res) => {
	let User = new User({
		nombre: user.nombre,
		email: user.email,
		password: bcrypt.hashSync(user.password, 10),
		role: user.role,
	});
	User.save((err, UserDB) => {
		if (err)
			return res.status(400).json({
				ok: false,
				err,
			});
		res.json({
			ok: true,
			User: UserDB,
		});
	});
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

const UsersService = {
	getAll,
	createOne,
	deleteAll,
	editOne,
	deleteOne,
};

module.exports = Object.freeze(UsersService);
