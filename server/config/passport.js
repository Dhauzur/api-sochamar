const localStrategy = require('../middleware/strategies/local');
const jwtStrategy = require('../middleware/strategies/jwt');
//If we want to add  strategies or functions like serialize and deserialize we use this function
const passportConfig = passport => {
	passport.use('local', localStrategy);
	passport.use('jwt', jwtStrategy);
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});
};

module.exports = passportConfig;
