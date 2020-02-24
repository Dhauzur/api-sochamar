import './config/config.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import passportConfig from './config/passport';
import path from 'path';
import routes from './routes/index';
const app = express();
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
app.use(express.static(path.resolve(`${__dirname}/uploads`)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportConfig(passport);
app.use(passport.initialize());

routes(app);

mongoose.connect(
	process.env.URLDB,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	err => {
		if (err) throw err;
		console.info('Data base online');
	}
);

app.listen(process.env.PORT || 3000, () => {
	console.info('MONGO URL');
	console.info(process.env.URLDB);
	console.info(`Listen on port ${process.env.PORT}`);
});
