const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

/*strategyConfig specified because we need to disable the session use*/
const strategyConfig = {
	usernameField: 'username',
	passwordField: 'password',
	session: false,
};
/*this is our local strategy, the callback is going to find if the user exist and the password is valid*/
/*if we want to finish the callback, we call the done() function*/
/*done(null, user) if the login is valid and done(null, false) if the login is invalid*/
passport.use(
	new LocalStrategy(strategyConfig, (username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			console.log('funciona la estrategia');
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	})
);
