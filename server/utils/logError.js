import logger from '../config/pino';

export default err => logger.error(err);
