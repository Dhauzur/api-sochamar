require('../config/config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const options = {};
/*jwt extraction from request header*/
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
/*jwt key*/
options.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(options, function(jwt_payload, done) {
	User.findOne({ id: jwt_payload.sub })
		.then(user => {
			if (user) {
				console.log('encontre el user del jwt');
				return done(null, user);
			} else {
				/*Este else lo podemos hacer funcionar si en un futuro implementamos estrategias de facebook, etc.*/
				console.log('no encontre el user, pero podemos crearlo');
				return done(null, false);
				// or you could create a new account
			}
		})
		.catch(err => done(err, false));
});

module.exports = strategy;
