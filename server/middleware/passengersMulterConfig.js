import path from 'path';
import multer from 'multer';

// config directory storage and filename
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../../uploads'));
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

// fileFilter documents or images
const fileFilter = (req, file, cb) => {
	if (file.fieldname === 'documents') {
		// if uploading pdf || msword || images
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg' ||
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

// instace multer to export
export default multer({
	storage,
	limits: {
		fileSize: '2mb',
	},
	fileFilter,
});
