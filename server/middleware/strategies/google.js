import { logError } from '../../config/pino';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import User from '../../models/user';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
	},
	function(accessToken, refreshToken, profile, done) {
		const createOneUser = profile => {
			const newUser = new User({
				name: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value,
				img: profile.photos[0].value,
				analyst: false,
				googleId: profile.id,
			});
			console.log(newUser);
			return newUser
				.save()
				.then(user => done(null, user))
				.catch(err => done(err, false));
		};

		User.findOne({ googleId: profile.id, email: profile.email })
			.then(user => {
				if (!user) createOneUser(profile);
				return done(null, user);
			})
			.catch(err => done(err, false));
	}
);

export default strategy;
