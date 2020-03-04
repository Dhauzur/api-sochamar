import path from 'path';
import { Storage } from '@google-cloud/storage';

const projectId = process.env.PROJECT_ID;
const keyFilename = path.join(__dirname, '../../google-storage.json');

const gcs = new Storage({ projectId, keyFilename });

const bucketName = process.env.BUCKETNAME;

const bucket = gcs.bucket(bucketName);

const getPublicUrl = filename => {
	return `https://storage.googleapis.com/${bucketName}/${filename}`;
};

export { bucket, getPublicUrl };
