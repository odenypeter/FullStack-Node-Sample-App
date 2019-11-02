import { apiApp } from '../app';
import { expectedResponse, transactionsMockData as data } from '../data/mock-data';
// import * as api from '../routes/app-routes';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('App Works', () => {
	it('takes user to the route of the API', (done) => {
		chai.request(apiApp)
			.get('/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body.status).to.equals('success');
				done();
			});
	});
});

describe('GET request to the API', () => {
	it('should return all transaction with no params', (done) => {
		chai.request(apiApp)
			.get('/api/transactions')
			.end((err, res) => {
				expect(res.text).not.to.equal({});
				done();
			});
	});

	it('should return all transaction with params', (done) => {
		chai.request(apiApp)
			.get('/api/transactions?transactionId=5c868b227167edc396fc3754&confidenceLevel=0.3')
			.end((err, res) => {
				expect(res.body).not.to.equal({});
				done();
			});
	});
});
