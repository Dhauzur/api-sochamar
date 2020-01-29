const activitiesRoutes = require('./activities');
const companyRoutes = require('./company');
const lodgingRoutes = require('./lodging');
const roomsRoutes = require('./rooms');
const reportsRoutes = require('./reports');
const usuariosRoutes = require('./usuario');
const configRoutes = require('./config');
/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
module.exports = (app) => {
    app.use(`/`, companyRoutes);
    app.use(`/`, activitiesRoutes);
    app.use(`/`, lodgingRoutes);
    app.use(`/`, roomsRoutes);
    app.use(`/`, reportsRoutes);
    app.use(`/`, usuariosRoutes);
    app.use(`/`, configRoutes);
};
