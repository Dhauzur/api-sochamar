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

export { bucket, getPublicUrl };
