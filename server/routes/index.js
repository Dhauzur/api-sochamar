const activitiesRoutes = require('./activities');
const companyRoutes = require('./company');
const lodgingRoutes = require('./lodging');
const roomsRoutes = require('./rooms');
const reportsRoutes = require('./reports');
const userRoutes = require('./user');
const configRoutes = require('./config');
const passengersRoutes = require('./passengers');
/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
/*esto mismo puede ser aplicado con las configuraciones de la app, ej: cors, etc*/
module.exports = app => {
	app.use(apiVersion, companyRoutes);
	app.use(apiVersion, activitiesRoutes);
	app.use(apiVersion, lodgingRoutes);
	app.use(apiVersion, roomsRoutes);
	app.use(apiVersion, reportsRoutes);
	app.use(apiVersion, userRoutes);
	app.use(apiVersion, configRoutes);
	app.use(apiVersion, passengersRoutes);
};
