const activitiesRoutes = require('./activities');
const companyRoutes = require('./company');
const lodgingRoutes = require('./lodging');
const roomsRoutes = require('./rooms');
/*Podemos usar esto tambien, generalmente es buena practica vesionar la api*/
const apiVersion = '/api/v1';

/*Exportamos una funcion anonima que requiere de app*/
/*Con esto ya podemos olvidarnos de configurar las rutas en server.js o app.js*/
module.exports = (app) => {
    app.use('/activities', activitiesRoutes);
    app.use('/company', companyRoutes);
    app.use(['/lodging','/lodgings'], lodgingRoutes);
    app.use('/rooms', roomsRoutes);
};
