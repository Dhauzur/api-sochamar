import { Router } from 'express';
import passport from 'passport';
import upload from '../middleware/multer';
import storage from '../middleware/storage';
import userController from '../controllers/users';
import userSchema from '../schemas/user';
import validation from '../middleware/validation';
import grantAccess from '../middleware/strategies/rbac';

const userRouter = Router();
userRouter.get(
	'/user/profile',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('readOwn', 'profile'),
	],
	userController.getProfile
);

userRouter.put(
	'/user/profile',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateOwn', 'profile'),
		validation(userSchema.updateProfile, 'body'),
	],
	userController.updateProfile
);

userRouter.patch(
	'/user/avatar',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateOwn', 'profile'),
		upload.single('avatar'),
		storage,
	],
	userController.updateAvatar
);

userRouter.patch(
	'/user/password',
	[
		passport.authenticate('jwt', { session: false }),
		grantAccess('updateOwn', 'profile'),
		validation(userSchema.updatePassword, 'body'),
	],
	userController.updatePassword
);

export default userRouter;
