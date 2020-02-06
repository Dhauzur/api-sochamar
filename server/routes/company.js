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
companyRouter.post(
	'/company/create',
	passport.authenticate('jwt', { session: false }),
	companyController.create
);
companyRouter.delete(
	'/company/delete/all',
	passport.authenticate('jwt', { session: false }),
	companyController.deleteAll
);

module.exports = companyRouter;
