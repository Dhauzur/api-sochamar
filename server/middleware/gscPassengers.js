import { bucket, getPublicUrl } from '../config/bucket';
import { isArray, isEmpty } from 'underscore';

/**
 * middlerware for save in google storage cloud
 * handler for multiple images and documents
 */
const uploadDocuments = async (req, res, next) => {
	if (
		typeof req.files.documents === 'undefined' ||
		(isArray(req.files.documents) && isEmpty(req.files.documents))
	)
		return next();

	const pendingPromises = [];
	for (let i = 0; i < req.files.documents.length; i++) {
		pendingPromises.push(
			new Promise((resolve, reject) => {
				const gcsname = `${req.files.documents[i].originalname}`;
				const file = bucket.file(gcsname);
				const stream = file.createWriteStream({
					metadata: {
						contentType: req.files.documents[i].mimetype,
					},
				});
				stream.on('error', err => {
					req.files.documents[i].cloudStorageError = err;
					reject(err);
				});
				stream.on('finish', () => {
					resolve({
						name: gcsname,
						url: getPublicUrl(gcsname),
					});
				});
				stream.end(req.files.documents[i].buffer);
			})
		);
	}
	await Promise.all(pendingPromises).then(res => (req.body.documents = res));
	next();
};

const uploadPassenger = (req, res, next) => {
	if (
		typeof req.files.passenger === 'undefined' ||
		(isArray(req.files.passenger) && isEmpty(req.files.passenger))
	)
		return next();

	const gcsname = `${req.files.passenger[0].originalname}`;
	const file = bucket.file(gcsname);
	const stream = file.createWriteStream({
		metadata: {
			contentType: req.files.passenger[0].mimetype,
		},
	});
	stream.on('error', err => {
		req.files.passenger[0].cloudStorageError = err;
		next(err);
	});
	stream.on('finish', () => {
		req.body.passenger = getPublicUrl(gcsname);
		next();
	});
	stream.end(req.files.passenger[0].buffer);
};

export { uploadPassenger, uploadDocuments };
