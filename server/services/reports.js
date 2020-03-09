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
		logError(error.message);
		return res.status(400).send({
			status: false,
			error: error.message,
		});
	}
};

const createOne = async (req, res) => {
	try {
		let body = req.body;
		let reports = new Report({
			member: body.member,
			whatWasDone: body.whatWasDone,
		});
		const reportsDB = await reports.save();
		res.json({
			status: true,
			reports: reportsDB,
		});
	} catch (error) {
		logError(error.message);
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
		logError(error.message);
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
