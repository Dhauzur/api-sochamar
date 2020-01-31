const express = require('express');
const passengersRouter = express.Router();
const passengersController = require('../controllers/passengers');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.fieldname === 'pdf') {
		// if uploading pdf || msword || document
		if (
			file.mimetype === 'application/pdf' ||
			file.mimetype === 'application/msword' ||
			file.mimetype ===
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		) {
			// check file type to be pdf, doc, or docx
			cb(null, true);
		} else {
			cb(null, false); // else fails
		}
	} else {
		// else uploading image
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			// check file type to be png, jpeg, png or jpg
			cb(null, true);
		} else {
			cb(null, false); // else fails
		}
	}
};

var upload = multer({
	storage,
	limits: {
		fileSize: '2mb',
	},
	fileFilter,
});

// route for get all passengers
passengersRouter.get('/passengers', passengersController.getAll);

// route create a passenger
passengersRouter.post(
	'/passengers/create',
	upload.fields([
		{
			name: 'passenger',
			maxCount: 1,
		},
		{
			name: 'pdf',
			maxCount: 5,
		},
	]),
	(req, res) => passengersController.create(req, res)
);

// route for update a passenger
passengersRouter.put(
	'/passengers/:id',
	upload.fields([
		{
			name: 'passenger',
			maxCount: 1,
		},
		{
			name: 'pdf',
			maxCount: 5,
		},
	]),
	(req, res) => passengersController.editOne(req, res)
);

module.exports = passengersRouter;
