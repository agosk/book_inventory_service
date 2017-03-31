/**
 * Created by skaczmarek on 23.03.2017.
 */
const request = require('supertest');
const stockRepository = require('./in-memory-mongo')();
const auth = require('./fake-auth')('test', 'test');
const app = require('./../src/index')({stockRepository, auth});


describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        request(app)
            .post('/stock')
            .send({"isbn": "12345625235", "count": 10})
            .expect({"isbn": "12345625235", "count": 10}, done);
    });

    it('FAIL AUTH', function () {


    });
});