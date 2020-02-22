// ============================
// Enviroment development
// Establece las variables de entorno para el trabajo local
// ============================
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.URLDB = process.env.URLDB || 'mongodb://localhost:27017/sochamar';
process.env.FRONTEND_URL =
	process.env.FRONTEND_URL || 'http://localhost:8080/#';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'sochamar12345';
process.env.JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
process.env.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '30d';
process.env.PASSWORD_RECOVERY_JWT_EXPIRATION =
	process.env.PASSWORD_RECOVERY_JWT_EXPIRATION || '4m';