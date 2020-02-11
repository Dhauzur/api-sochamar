const express = require('express');
const passport = require('passport');

const lodgingRouter = express.Router();
const lodgingController = require('../controllers/lodging');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
lodgingRouter.delete(
	'/lodging/delete/company/:id',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteOneWithCompanyId
);
lodgingRouter.delete(
	'/lodging/delete/all',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteAll
);
lodgingRouter.delete(
	'/lodging/delete/companies/:company',
	passport.authenticate('jwt', { session: false }),
	lodgingController.deleteAllWithCompany
);
lodgingRouter.get(
	'/lodgings',
	passport.authenticate('jwt', { session: false }),
	lodgingController.getAll
);
lodgingRouter.post(
	'/lodging',
	passport.authenticate('jwt', { session: false }),
	lodgingController.create
);

module.exports = lodgingRouter;
