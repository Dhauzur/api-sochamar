import './config/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import passportConfig from './config/passport';
import path from 'path';
import routes from './routes/index';
import { logger, logError } from './config/pino';
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportConfig(passport);
app.use(passport.initialize());

routes(app);

mongoose
	.connect(process.env.URLDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(logger.info('database online'))
	.catch(err => logError('Database error: ' + err));

app.listen(process.env.PORT, () => {
	logger.info(`Listen on port ${process.env.PORT}`);
});
