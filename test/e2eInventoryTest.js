/**
 * Created by skaczmarek on 23.03.2017.
 */
const request = require('supertest');
const app = require('./../index');

describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        request(app)
            .post('/stock')
            .send({"isbn": "12345625235", "count": 10})
            .expect({"isbn": "12345625235", "count": 10}, done);
    })
});