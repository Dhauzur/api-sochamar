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
		const googleEmail = profile.emails[0].value;

		const createOneUser = profile => {
			const newUser = new User({
				name: profile.name.givenName,
				lastName: profile.name.familyName,
				email: googleEmail,
				img: profile.photos[0].value,
				analyst: false,
				password: 'SOLO PARA TESTING DE GOOGL AUTH',
				googleId: profile.id,
			});
			return newUser
				.save()
				.then(user => done(null, user))
				.catch(err => done(err, false));
		};

		const updateOneUser = (user, profile) => {
			user.name = profile.name.givenName;
			user.lastName = profile.name.familyName;
			user.email = googleEmail;
			user.img = profile.photos[0].value;
			user.googleId = profile.id;
			return user
				.save()
				.then(updatedUser => done(null, updatedUser))
				.catch(err => done(err, false));
		};

		const findOneWIthGoogleEmail = email => {
			return User.findOne({ email: email })
				.then(user => user)
				.catch(err => done(err, false));
		};
		//Importante. Es posible que el correo exista en la db entonces nosotros buscamos si existe
		//en caso de encontrar un usuario, actualizamos sus datos y añadimos la id de google profile
		const found = findOneWIthGoogleEmail(googleEmail);
		found.then(user => {
			if (user) {
				updateOneUser(user, profile);
			} else {
				//Si el usuario no existe con el correo, procedemos a buscar uno mediante su google id*/
				User.findOne({ googleId: profile.id })
					.then(user => {
						/*Finalizando actualizando o creando el usuario correspondiente*/
						if (!user) createOneUser(profile);
						else updateOneUser(user, profile);
					})
					.catch(err => done(err, false));
			}
		});
	}
);

export default strategy;
