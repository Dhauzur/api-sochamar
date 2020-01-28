const express = require('express');

const usuariosRouter = express.Router();
const usuariosController = require('../controllers/usuario');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
usuariosRouter.get('/usuario', usuariosController.getAll);
usuariosRouter.post('/usuario', usuariosController.createOne);
usuariosRouter.put('/usuario/:id', usuariosController.editOne);
usuariosRouter.delete('/usuario/:id', usuariosController.deleteOne);
usuariosRouter.delete('/usuario/delete/all', usuariosController.editOne);
/*Esperando confirmacion del pull request para traducir la entidad usuario*/
module.exports = usuariosRouter;
