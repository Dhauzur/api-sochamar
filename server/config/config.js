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

if (process.env.NODE_ENV == 'dev') {
	urlDB = 'mongodb://localhost:27017/sochamar';
} else {
	urlDB =
		'mongodb+srv://silvita:Perez123@api-sochamar-awvck.mongodb.net/sochamar';
}
process.env.URLDB = urlDB;

// mongodb+srv://sochamar:<password>@sochamarmongodb-ubxn7.gcp.mongodb.net/test?retryWrites=true&w=majority
