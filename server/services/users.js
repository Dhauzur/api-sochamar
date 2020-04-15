import User from '../models/user';
import { logError, logInfo } from '../config/pino';
import bcrypt from 'bcrypt';
import { actionInfo } from '../utils/logger/infoMessages';
import { errorResponse } from '../utils/responses/errorResponse';
import { createdResponse } from '../utils/responses/createdResponse';

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

const getProfile = async (id, res) => {
	const user = await User.findById(id);
	sendProfile(user, res);
};

const updateProfile = async (user, profile, res) => {
	try {
		const updated = await User.findByIdAndUpdate(user._id, profile, {
			new: true,
			runValidators: true,
		});
		logInfo(actionInfo(user.email, 'actualizo su perfil'));
		sendProfile(updated, res);
	} catch (e) {
		logError(e.message);
		res.status(400).json(e);
	}
};

const updateAvatar = async (user, img, res) => {
	try {
		const updated = await User.findByIdAndUpdate(
			user._id,
			{ img },
			{
				new: true,
			}
		);
		logInfo(actionInfo(user.email, 'actualizo su avatar'));
		createdResponse(img, updated.img, res);
	} catch (e) {
		logError(e.message);
		errorResponse(e, res);
	}
};

const updatePassword = async (user, password, res) => {
	const changeActualPassword = async user => {
		user.password = bcrypt.hashSync(password, 10);
		await user.save();
		logInfo(actionInfo(user.email, 'actualizo su contraseña'));
		res.sendStatus(200);
	};
	try {
		const user = await User.findById(user._id);
		const isEqual = bcrypt.compareSync(password, user.password);
		//if the password is the same, we cancel the update with this
		if (isEqual) return res.sendStatus(409);
		else await changeActualPassword(user);
	} catch (e) {
		logError(e.message);
		errorResponse(e, res);
	}
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
