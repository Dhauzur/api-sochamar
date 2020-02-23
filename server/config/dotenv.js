// Import all env vars from .env file
require("dotenv").config();
export const API_URL = process.env._API_URL;
export const FRONTEND_URL = process.env._FRONTEND_URL;
export const JWT_ALGORITHM = process.env._JWT_ALGORITHM;
export const JWT_EXPIRATION = process.env._JWT_EXPIRATION;
export const JWT_SECRET = process.env._JWT_SECRET;
export const PASSWORD_RECOVERY_JWT_EXPIRATION =
  process.env._PASSWORD_RECOVERY_JWT_EXPIRATION;
export const URLDB = process.env._URLDB;
export const NODE_ENV = process.env._NODE_ENV;
console.log("CONFIG DOT");
console.log(URLDB); // => Hello
