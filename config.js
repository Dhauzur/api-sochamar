// Import all env vars from .env file
require("dotenv").config();
export const API_URL = process.env.API_URL;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const JWT_SECRET = process.env.JWT_SECRET;
export const URLDB = process.env.URLDB;
export const NODE_ENV = process.env.NODE_ENV;
console.log(API_URL);
console.log(FRONTEND_URL);
console.log(JWT_ALGORITHM);
console.log(JWT_EXPIRATION);
console.log(JWT_SECRET);
console.log(URLDB);
console.log(NODE_ENV);
console.log(PASSWORD_RECOVERY_JWT_EXPIRATION);
