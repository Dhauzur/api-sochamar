import { logError } from '../../config/pino';
import { errorResponse } from '../responses/errorResponse';

export const errorCallback = (err, res) => {
	logError(err.message);
	errorResponse(err, res);
};
