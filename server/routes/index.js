import activitiesRoutes from './activities';
import companyRoutes from './company';
import lodgingRoutes from './lodging';
import roomsRoutes from './rooms';
import reportsRoutes from './reports';
import userRoutes from './user';
import configRoutes from './config';
import passengersRoutes from './passengers';
import paymentsRoutes from './payments';
import authRoutes from './auth';

/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
/*esto mismo puede ser aplicado con las configuraciones de la app, ej: cors, etc*/
export default app => {
	app.use(apiVersion, companyRoutes);
	app.use(apiVersion, activitiesRoutes);
	app.use(apiVersion, lodgingRoutes);
	app.use(apiVersion, roomsRoutes);
	app.use(apiVersion, reportsRoutes);
	app.use(apiVersion, userRoutes);
	app.use(apiVersion, configRoutes);
	app.use(apiVersion, passengersRoutes);
	app.use(apiVersion, paymentsRoutes);
	app.use(apiVersion, authRoutes);
};
