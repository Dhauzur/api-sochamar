import { bucket, getPublicUrl } from '../config/gscConfig';

const storage = (req, res, next) => {
	if (!req.file) return next();
	const gcsname = `${req.file.originalname}`;
	const file = bucket.file(gcsname);
	const stream = file.createWriteStream({
		metadata: {
			contentType: req.file.mimetype,
		},
	});
	stream.on('error', err => {
		req.file.cloudStorageError = err;
		next(err);
	});
	stream.on('finish', () => {
		req.file.cloudStorageObject = gcsname;
		req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
		next();
	});
	stream.end(req.file.buffer);
};

export default storage;
