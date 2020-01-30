require('./config/config');
const express = require('express');
const app = express();
const passport = require('passport');
const localStrategy = require('./strategies/local');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

passport.use('local', localStrategy);
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

routes(app);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
	if (err) throw err;
	console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto: ', process.env.PORT);
});
