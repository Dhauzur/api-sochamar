import Report from '../models/reports';
import { logError } from '../config/pino';

const getAll = async res => {
	try {
		const reports = await Report.find(null);
		const length = await Report.countDocuments(null);
		res.json({
			status: true,
			reports: reports.reverse(),
			length,
		});
	} catch (error) {
		logError(error);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const createOne = async (report, res) => {
	try {
		let reports = new Report(report);
		const reportsDB = await reports.save();
		res.json({
			status: true,
			reports: reportsDB,
		});
	} catch (error) {
		logError(error);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const deleteAll = async res => {
	try {
		await Report.deleteMany({});
		res.json({
			status: true,
		});
	} catch (error) {
		logError(error);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const reportService = {
	getAll,
	createOne,
	deleteAll,
};

export default Object.freeze(reportService);
