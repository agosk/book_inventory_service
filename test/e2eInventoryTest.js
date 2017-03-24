/**
 * Created by skaczmarek on 23.03.2017.
 */
const request = require('supertest');
const inmemoryrepository = require('./in-memory-mongo')();
const app = require('./../src/index')(inmemoryrepository);




describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        request(app)
            .post('/stock')
            .send({"isbn": "12345625235", "count": 10})
            .expect({"isbn": "12345625235", "count": 10}, done);
    })
});