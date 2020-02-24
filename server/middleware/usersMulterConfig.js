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
	if (file.fieldname === 'avatar') {
		// if uploading pdf || msword || images
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			// check file type to be a valid image format
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
