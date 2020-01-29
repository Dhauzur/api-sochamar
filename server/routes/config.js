const express = require('express');

const configRouter = express.Router();
const configController = require('../controllers/config');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
configRouter.get('/config', configController.getConfig);

module.exports = configRouter;
