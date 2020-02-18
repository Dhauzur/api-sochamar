import User from '../models/user';
import { pick } from 'underscore';
import logger from '../config/pino';

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

const editOne = (req, res) => {
	let id = req.params.id;
	let body = pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
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
/*After we find our target user, we dont need the entire data*/
/*GenerateProfile is going to return a profile object based in our user*/
const generateImgUrl = img => {
	return 'http://localhost:3000/' + img;
};

const generateProfile = user => {
	let imgUrl;
	if (user.img) {
		imgUrl = generateImgUrl(user.img);
	} else {
		imgUrl = generateImgUrl('default.png');
	}
	return {
		name: user.name,
		lastName: user.lastName,
		img: imgUrl,
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

const updateProfile = (id, profile, res) => {
	User.findByIdAndUpdate(id, profile, {
		new: true,
		runValidators: true,
	})
		.then(updated => sendProfile(updated, res))
		.catch(err => res.status(400).json(err));
};

const updateAvatar = (id, img, res) => {
	User.findByIdAndUpdate(
		id,
		{ img },
		{
			new: true,
			runValidators: true,
		}
	)
		.then(updated => res.json({ img: generateImgUrl(updated.img) }))
		.catch(err => res.status(400).json(err));
};

const updatePassword = (id, password, res) => {
	const comparePasswords = (newPassword, userPassword) => {
		if (newPassword === userPassword) {
			return true;
		} else {
			return false;
		}
	};
	const changeActualPassword = user => {
		const isEqual = comparePasswords(user.password, password);
		//if the password is the same, we cancel the update with this
		if (isEqual) return res.sendStatus(409);

		user.password = password;
		user.save()
			.then(() => res.sendStatus(200))
			.catch(e => res.status(400).send(e));
	};

	User.findById(id)
		.then(user => changeActualPassword(user))
		.catch(e => logger.error(e));
};

const UsersService = {
	getAll,
	deleteAll,
	editOne,
	deleteOne,
	getProfile,
	updateProfile,
	updateAvatar,
	updatePassword,
};

export default Object.freeze(UsersService);
