import { Router } from 'express';
import reportsController from '../controllers/reports';
import reportsSchema from '../schemas/reports';
import validation from '../middleware/validation';

const reportsRouter = Router();

/* Ojo, aca podemos optimizar los nombres de ruta quitando cosas como /create o /delete/all*/
/* Los verbos de por si ya estan dando a entender la accion que se realiza sobre esta ruta*/
reportsRouter.get('/reports', reportsController.getAll);
reportsRouter.post(
	'/reports/create',
	validation(reportsSchema.create, 'body'),
	reportsController.create
);
reportsRouter.delete('/reports/delete/all', reportsController.deleteAll);

export default reportsRouter;
