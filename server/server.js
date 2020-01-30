require('./config/config');
const express = require('express');
const app = express();
const passport = require('passport');
const passportConfig = require('./config/passport');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passportConfig(passport);
app.use(passport.initialize());

routes(app);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
	if (err) throw err;
	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
});
