import User from '../models/user';
import { logError } from '../config/pino';
import bcrypt from 'bcrypt';

const getAll = res => {
	User.find({ estado: true }, 'nombre email role estado google img').exec(
		(err, Users) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err,
				});
			User.countDocuments({ estado: true }, (err, conteo) => {
				res.json({
					ok: true,
					Users,
					cuantos: conteo,
				});
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
	let imgUrl;
	if (user.img) {
		imgUrl = user.img;
	}
	return {
		_id: user._id,
		email: user.email,
		name: user.name,
		lastName: user.lastName,
		img: imgUrl,
		role: user.role,
		idPerson: user.idPerson,
		analyst: user.analyst,
	};
};

const sendProfile = (user, res) => {
	const profile = generateProfile(user);
	return res.json(profile);
};

const getProfile = (id, res) => {
	User.findById(id).then(user => sendProfile(user, res));
};

const updateProfile = async (id, profile, res) => {
	try {
		const updated = await User.findByIdAndUpdate(id, profile, {
			new: true,
			runValidators: true,
		});
		sendProfile(updated, res);
	} catch (error) {
		logError(error.message);
		res.status(400).json(error);
	}
};

const updateAvatar = (id, img, res) => {
	User.findByIdAndUpdate(
		id,
		{ img },
		{
			new: true,
		}
	)
		.then(updated => res.json({ img: updated.img }))
		.catch(err => res.status(400).json(err));
};

const updatePassword = (id, password, res) => {
	const changeActualPassword = user => {
		const isEqual = bcrypt.compareSync(password, user.password);
		//if the password is the same, we cancel the update with this
		if (isEqual) return res.sendStatus(409);

		user.password = bcrypt.hashSync(password, 10);
		user.save()
			.then(() => res.sendStatus(200))
			.catch(e => res.status(400).send(e));
	};

	User.findById(id)
		.then(user => changeActualPassword(user))
		.catch(logError);
};

const UsersService = {
	getAll,
	deleteAll,
	deleteOne,
	getProfile,
	updateProfile,
	updateAvatar,
	updatePassword,
};

export default Object.freeze(UsersService);
