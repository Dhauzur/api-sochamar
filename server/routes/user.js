const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/users');

/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
userRouter.get('/user', userController.getAll);
userRouter.post('/user', userController.createOne);
userRouter.put('/user/:id', userController.editOne);
userRouter.delete('/user/:id', userController.deleteOne);
userRouter.delete('/user/delete/all', userController.deleteAll);

module.exports = userRouter;
