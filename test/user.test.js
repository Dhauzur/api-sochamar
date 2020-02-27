import app from '../server/app';
import request from 'supertest';

describe('Registro de usuario', () => {
	//To pass the register test, we need to generate a random email
	const randomNumber = Math.floor(Math.random() * 99999 + 1);
	const randomEmail =
		'prueba' + randomNumber + '@prueba' + randomNumber + '.cl';
	const emailInDb = {
		name: 'prueba 1',
		email: 'prueba@prueba.cl',
		password: 'asd',
	};
	const newUser = {
		name: 'prueba 1',
		email: randomEmail,
		password: 'asd',
	};
	test('Deberia devolvernos codigo 409 si el correo ya existe', done => {
		request(app)
			.post('/api/v1/auth/register')
			.send(emailInDb)
			.then(response => {
				expect(response.statusCode).toBe(409);
				done();
			});
	});
	test('Deberia devolvernos codigo 201 si el registro es exitoso', done => {
		request(app)
			.post('/api/v1/auth/register')
			.send(newUser)
			.then(response => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});
});
