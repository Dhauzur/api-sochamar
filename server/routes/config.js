import { Router } from 'express';
import passport from 'passport';
import configController from '../controllers/config';

const configRouter = Router();
/*Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/*Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
configRouter.get(
	'/config',
	passport.authenticate('jwt', { session: false }),
	configController.getConfig
);

export default configRouter;
