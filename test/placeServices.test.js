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
/*Para que funcionen los test, necesitamos una id de place que ya exista en la db*/
let placeIdinDB = '5e66754bde1c150920ed7efb';
/*Cuando pase el test de post, esta variable nos servira para testear PUT, DELETE y GET de un solo recurso*/
let placeServiceId;
describe('POST /placeService', () => {
	const invalidData = {
		placeId: 1,
		name: 1,
		price: 'd',
	};
	const validData = {
		placeId: placeIdinDB,
		name: 'test unitario',
		price: 10000,
	};
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.post('/api/v1/placeService')
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no proporcionamos un body', done => {
		request(app)
			.post('/api/v1/placeService')
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no cumplimos con el esquema Joi', done => {
		request(app)
			.post('/api/v1/placeService')
			.set('Authorization', `Bearer ${token}`)
			.send(invalidData)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 201 y el resultado si cumplimos con el esquema Joi', done => {
		request(app)
			.post('/api/v1/placeService')
			.set('Authorization', `Bearer ${token}`)
			.send(validData)
			.then(response => {
				const { placeService } = response.body;
				placeServiceId = placeService._id;
				expect(response.statusCode).toBe(201);
				expect(placeService).toBeDefined();
				done();
			});
	});
});

describe('GET /placeServices', () => {
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.get('/api/v1/placeServices/' + placeIdinDB)
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 200 y un arreglo vacio/con valores si incluimos placeId como parametro', done => {
		request(app)
			.get('/api/v1/placeServices/' + placeIdinDB)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				const { placeServices } = response.body;
				expect(response.statusCode).toBe(200);
				expect(placeServices.length).toBeGreaterThanOrEqual(0);
				done();
			});
	});
});

describe('GET /placeService/:placeId', () => {
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.get('/api/v1/placeService/' + placeServiceId)
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 200 y un objeto si incluimos una id existente', done => {
		request(app)
			.get('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				const { placeService } = response.body;
				expect(response.statusCode).toBe(200);
				expect(placeService).toBeDefined();
				done();
			});
	});
	test('Deberia devolvernos codigo 409 si no existe el documento con esa id', done => {
		request(app)
			.get('/api/v1/placeService/' + placeIdinDB)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(409);
				done();
			});
	});
});

describe("PUT /placeService/:placeId'", () => {
	const invalidData = {
		name: 1,
		price: 'd',
	};
	const validData = {
		placeId: placeIdinDB,
		name: 'test unitario',
	};
	test('Deberia devolvernos codigo 401 si no proporcionamos un token en la request', done => {
		request(app)
			.put('/api/v1/placeService/' + placeServiceId)
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no proporcionamos un body', done => {
		request(app)
			.put('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 422 si no cumplimos con el esquema Joi', done => {
		request(app)
			.put('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.send(invalidData)
			.then(response => {
				expect(response.statusCode).toBe(422);
				done();
			});
	});
	test('Deberia devolvernos codigo 201 si cumplimos con el esquema Joi', done => {
		request(app)
			.put('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.send(validData)
			.then(response => {
				expect(response.statusCode).toBe(201);
				done();
			});
	});
});

describe("DELETE /placeService/:placeId'", () => {
	test('Deberia devolvernos codigo 200 si el documento fue borrado', done => {
		request(app)
			.delete('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(200);
				done();
			});
	});
	test('Deberia devolvernos codigo 409 si buscamos este documento borrado', done => {
		request(app)
			.get('/api/v1/placeService/' + placeServiceId)
			.set('Authorization', `Bearer ${token}`)
			.then(response => {
				expect(response.statusCode).toBe(409);
				done();
			});
	});
});
