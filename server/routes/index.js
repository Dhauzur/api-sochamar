import activitiesRoutes from './activities';
import authRoutes from './auth';
import configRoutes from './config';
import lodgingRoutes from './lodging';
import paymentsRoutes from './payments';
import periodsRoutes from './period';
import personRoutes from './person';
import placeRoutes from './place';
import reportsRoutes from './reports';
import roomsRoutes from './room';
import userRoutes from './user';
import transactionsRouter from './transactions';

const apiVersion = '/api/v1';

export default app => {
	app.use(apiVersion, activitiesRoutes);
	app.use(apiVersion, authRoutes);
	app.use(apiVersion, configRoutes);
	app.use(apiVersion, lodgingRoutes);
	app.use(apiVersion, paymentsRoutes);
	app.use(apiVersion, periodsRoutes);
	app.use(apiVersion, personRoutes);
	app.use(apiVersion, placeRoutes);
	app.use(apiVersion, reportsRoutes);
	app.use(apiVersion, roomsRoutes);
	app.use(apiVersion, userRoutes);
	app.use(apiVersion, transactionsRouter);
};
