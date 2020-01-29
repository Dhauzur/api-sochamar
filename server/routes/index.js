const activitiesRoutes = require('./activities');
const companyRoutes = require('./company');
const lodgingRoutes = require('./lodging');
const roomsRoutes = require('./rooms');
const reportsRoutes = require('./reports');
const userRoutes = require('./user');
const configRoutes = require('./config');
/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
/*esto mismo puede ser aplicado con las configuraciones de la app, ej: cors, etc*/
module.exports = (app) => {
    app.use(`/`, companyRoutes);
    app.use(`/`, activitiesRoutes);
    app.use(`/`, lodgingRoutes);
    app.use(`/`, roomsRoutes);
    app.use(`/`, reportsRoutes);
    app.use(`/`, userRoutes);
    app.use(`/`, configRoutes);
};
