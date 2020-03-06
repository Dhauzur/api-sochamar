import app from '../server/app';
import request from 'supertest';

describe('Rutas de auth', () => {
	describe('Registro de usuario', () => {
		//To pass the register test, we need to generate a random email
		const randomNumber = Math.floor(Math.random() * 99999 + 1);
		const randomEmail =
			'prueba' + randomNumber + '@prueba' + randomNumber + '.cl';
		const emailInDb = {
			name: 'prueba 1',
			email: 'prueba@prueba.cl',
			password: 'asddsfsd',
		};
		const newUser = {
			name: 'prueba 1',
			email: randomEmail,
			password: 'asdfg',
		};
		const invalidSchema = {
			name: 'p',
			email: 'fffffffsd.cl',
			password: 'as',
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
		test('Deberia devolvernos codigo 422 si no enviamos un body', done => {
			request(app)
				.post('/api/v1/auth/register')
				.then(response => {
					expect(response.statusCode).toBe(422);
					done();
				});
		});
		test('Deberia devolvernos codigo 422 si cumplimos con las reglas de joi', done => {
			request(app)
				.post('/api/v1/auth/register')
				.send(invalidSchema)
				.then(response => {
					expect(response.statusCode).toBe(422);
					done();
				});
		});
	});
	describe('Login de usuario', () => {
		const invalidUser = {
			email: 'prueba@prueba.cl',
			password: 'asdgggggggggggggg',
		};
		const validUser = {
			email: 'unitTesting@prueba.cl',
			password: 'prueba12345',
		};
		test('Deberia devolvernos codigo 401 si el login es invalido', done => {
			request(app)
				.post('/api/v1/auth/login')
				.send(invalidUser)
				.then(response => {
					expect(response.statusCode).toBe(401);
					done();
				});
		});
		test('Deberia devolvernos codigo 200 si el login es valido', done => {
			request(app)
				.post('/api/v1/auth/login')
				.send(validUser)
				.then(response => {
					expect(response.statusCode).toBe(200);
					done();
				});
		});
	});
});
