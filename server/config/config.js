// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  data base
// ============================
let urlDB;
let frontendUrl;
let apiUrl;
if (process.env.NODE_ENV == 'dev') {
	urlDB = 'mongodb://localhost:27017/sochamar';
	frontendUrl = 'http://localhost:8080/#';
	apiUrl = 'http://localhost:3000/';
} else {
	urlDB =
		'mongodb+srv://silvita:Perez123@api-sochamar-awvck.mongodb.net/sochamar';
	frontendUrl = 'http://sochamar.cl/#';
	apiUrl = 'http://35.247.219.245:3000/';
}
process.env.URLDB = urlDB;
process.env.FRONTEND_URL = frontendUrl;
process.env.API_URL = apiUrl;
// mongodb+srv://sochamar:<password>@sochamarmongodb-ubxn7.gcp.mongodb.net/test?retryWrites=true&w=majority

//jwt
process.env.JWT_SECRET = 'sochamar12345';
process.env.JWT_ALGORITHM = 'HS256';
process.env.JWT_EXPIRATION = '30d';
process.env.PASSWORD_RECOVERY_JWT_EXPIRATION = '4m';
