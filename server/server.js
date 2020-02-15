import './config/config';
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
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportConfig(passport);
app.use(passport.initialize());

routes(app);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, err => {
	if (err) throw err;
	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
});
