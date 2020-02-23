// Import all env vars from .env file
require("dotenv").config();
export const API_URL = process.env.MY_SECRET_KEY;
export const FRONTEND_URL = process.env.MY_SECRET_KEY;
export const JWT_ALGORITHM = process.env.MY_SECRET_KEY;
export const JWT_EXPIRATION = process.env.MY_SECRET_KEY;
export const JWT_SECRET = process.env.MY_SECRET_KEY;
export const PASSWORD_RECOVERY_JWT_EXPIRATION = process.env.MY_SECRET_KEY;
export const URLDB = process.env.MY_SECRET_KEY;
export const NODE_ENV = process.env.MY_SECRET_KEY;
