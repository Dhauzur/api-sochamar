const express = require('express');

const lodgingRouter = express.Router();
const lodgingController = require('../controllers/lodging');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
lodgingRouter.delete(
	'/lodging/delete/company/:id',
	lodgingController.deleteOneWithCompanyId
);
lodgingRouter.delete('/lodging/delete/all', lodgingController.deleteAll);
lodgingRouter.delete(
	'/lodging/delete/companies/:company',
	lodgingController.deleteAllWithCompany
);
lodgingRouter.get('/lodgings', lodgingController.getAll);
lodgingRouter.post('/lodging', lodgingController.create);

module.exports = lodgingRouter;
