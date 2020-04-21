import pino from 'pino';

export const logger = pino({
	prettyPrint: {
		ignore: 'pid,hostname,time',
		levelFirst: true,
	},
	level: 'info',
});

export const logError = err => logger.error(err.message);

export const logInfo = info => logger.info(info);
