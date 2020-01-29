const express = require('express');

const roomsRouter = express.Router();
const roomsController = require('../controllers/rooms');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
roomsRouter.get('/rooms', roomsController.getAll);
roomsRouter.post('/rooms/create', roomsController.create);
roomsRouter.delete('/rooms/delete/all', roomsController.deleteAll);

module.exports = roomsRouter;
