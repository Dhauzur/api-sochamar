import { Router } from 'express';
import passport from 'passport';
import upload from '../middleware/usersMulterConfig';
import userController from '../controllers/users';

const userRouter = Router();

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

userRouter.patch(
	'/user/password',
	passport.authenticate('jwt', { session: false }),
	userController.updatePassword
);

module.exports = userRouter;
