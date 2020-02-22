// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Enviroment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  data base
// ============================

if (process.env.NODE_ENV == "dev") {
  urlDB = "mongodb://localhost:27017/sochamar";
  process.env.URLDB = urlDB;
  process.env.JWT_SECRET = "sochamar12345";
  process.env.JWT_ALGORITHM = "HS256";
  process.env.JWT_EXPIRATION = 6000;
}
