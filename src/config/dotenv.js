// Import all env vars from .env file
require("dotenv").config();
export const API_URL = process.env.API_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const JWT_SECRET = process.env.JWT_SECRET;
export const PASSWORD_RECOVERY_JWT_EXPIRATION =
  process.env.PASSWORD_RECOVERY_JWT_EXPIRATION;
export const URLDB = process.env.URLDB;
export const NODE_ENV = process.env.NODE_ENV;
console.log("CONFIG DOT");
console.log(process.env);
console.log(URLDB); // => Hello
