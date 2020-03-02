import path from 'path';
import { Storage } from '@google-cloud/storage';

const defaultBucketName = 'bucket-plhain-staging';
const projectId = 'sochamar-staging-api';
const keyFilename = path.join(
	__dirname,
	'../../sochamar-staging-api-6421668c08a4.json'
);

const gcs = new Storage({ projectId, keyFilename });

const bucketName = defaultBucketName;
const bucket = gcs.bucket(bucketName);

const getPublicUrl = filename => {
	return `https://storage.googleapis.com/${bucketName}/${filename}`;
};

const upload = (req, res, next) => {
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

export default upload;
