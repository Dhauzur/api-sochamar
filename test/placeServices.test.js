import app from '../server/app';
import request from 'supertest';
let token;
const validUser = {
	email: 'unitTesting@prueba.cl',
	password: 'prueba12345',
};
beforeAll(done => {
	request(app)
		.post('/api/v1/auth/login')
		.send(validUser)
		.then(response => {
			token = response.body.token;
			done();
		});
});

describe('POST /placeServices', () => {
	const invalidData = {
		placeId: 1,
		name: 1,
		price: 'd',
	};
	const validData = {
		placeId: '23jh4123kh12jjk3',
		name: 'test unitario',
		price: 10000,
	};
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.post('/api/v1/placeServices')
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no proporcionamos un body', done => {
		request(app)
			.post('/api/v1/placeServices')
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no cumplimos con el esquema Joi', done => {
		request(app)
			.post('/api/v1/placeServices')
			.set('Authorization', `Bearer ${token}`)
			.send(invalidData)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 201 si cumplimos con el esquema Joi', done => {
		request(app)
			.post('/api/v1/placeServices')
			.set('Authorization', `Bearer ${token}`)
			.send(validData)
			.then(response => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});
});
describe('PUT /placeServices', () => {
	const invalidData = {
		placeId: 1,
		name: 1,
		price: 'd',
	};
	const validData = {
		placeId: '23jh4123kh12jjk3',
		name: 'test unitario',
	};
	const placeId = 'asdjaskd1';
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.put('/api/v1/placeServices/' + placeId)
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no proporcionamos un body', done => {
		request(app)
			.put('/api/v1/placeServices/' + placeId)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no cumplimos con el esquema Joi', done => {
		request(app)
			.put('/api/v1/placeServices/' + placeId)
			.set('Authorization', `Bearer ${token}`)
			.send(invalidData)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 201 si cumplimos con el esquema Joi', done => {
		request(app)
			.put('/api/v1/placeServices/' + placeId)
			.set('Authorization', `Bearer ${token}`)
			.send(validData)
			.then(response => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});
});
