const activitiesRoutes = require('./activities');
const companyRoutes = require('./company');
const lodgingRoutes = require('./lodging');
const roomsRoutes = require('./rooms');
const reportsRoutes = require('./reports');
const usuariosRoutes = require('./usuario');
/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
module.exports = (app) => {
    app.use('/activities', activitiesRoutes);
    app.use('/company', companyRoutes);
    app.use(['/lodgings','/lodgings'], lodgingRoutes);
    app.use('/rooms', roomsRoutes);
    app.use('/reports', reportsRoutes);
    app.use('/usuario', usuariosRoutes);
};
