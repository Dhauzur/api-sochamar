import { Router } from 'express';
import passport from 'passport';
import upload from '../middleware/multer';
import storage from '../middleware/storage';
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
	[
		passport.authenticate('jwt', { session: false }),
		upload.single('avatar'),
		storage,
	],
	userController.updateAvatar
);

userRouter.patch(
	'/user/password',
	passport.authenticate('jwt', { session: false }),
	userController.updatePassword
);

export default userRouter;
