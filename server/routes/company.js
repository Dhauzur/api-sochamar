const express = require('express');
const passport = require('passport');

const companyRouter = express.Router();
const companyController = require('../controllers/company');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
companyRouter.get(
	'/company',
	passport.authenticate('jwt', { session: false }),
	companyController.getAll
);
companyRouter.get(
	'/company/:id',
	passport.authenticate('jwt', { session: false }),
	companyController.getOne
);
companyRouter.post(
	'/company',
	passport.authenticate('jwt', { session: false }),
	companyController.create
);
companyRouter.delete(
	'/company/all',
	passport.authenticate('jwt', { session: false }),
	companyController.deleteAll
);
companyRouter.delete(
	'/company/one/:id',
	passport.authenticate('jwt', { session: false }),
	companyController.deleteOne
);

module.exports = companyRouter;
