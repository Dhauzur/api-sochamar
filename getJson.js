// file for request credential bucket
const fs = require('fs');
console.log(process.env.BUCKETNAME);
const credentials = fs.existsSync('google-storage.json');
if (credentials) {
	console.log('google-storage.json exist');
	process.exit(1);
}
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage();

const bucketName = 'sochamar-staging-api.appspot.com';

console.log(`donwloading json from ${bucketName}`);
gcs.bucket(bucketName)
	.file('google-storage.json')
	.download({ destination: 'google-storage.json' })
	.then(() => console.log('Download successfully'))
	.catch(e => {
		console.error(
			'google-storage: there was error',
			JSON.stringify(e, undefined, 2)
		);
	});
