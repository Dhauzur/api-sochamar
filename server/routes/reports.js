const express = require('express');

const reportsRouter = express.Router();
const reportsController = require('../controllers/reports');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
reportsRouter.get('/reports', reportsController.getAll);
reportsRouter.post('/reports/create', reportsController.create);
reportsRouter.delete('/reports/delete/all', reportsController.deleteAll);

module.exports = reportsRouter;
