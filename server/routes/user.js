const express = require('express');
const passport = require('passport');
const upload = require('../middleware/passengersMulterConfig');

const userRouter = express.Router();
const userController = require('../controllers/users');

userRouter.get(
	'/user/profile',
	passport.authenticate('jwt', { session: false }),
	userController.getProfile
);

userRouter.put(
	'/user/profile',
	passport.authenticate('jwt', { session: false }),
	userController.updateProfile
);

userRouter.patch(
	'/user/avatar',
	[passport.authenticate('jwt', { session: false }), upload.single('avatar')],
	userController.updateAvatar
);

module.exports = userRouter;
