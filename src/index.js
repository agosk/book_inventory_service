var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (stockRepository) {

    var error = require('./error');
    var routes = require('./routes')(stockRepository);

    var app = express();

    app.use(bodyParser.json());

    app.get('/', routes.hello);
    app.post('/stock', routes.stockUp);
    app.get('/stock', routes.findAll);
    app.get('/stock/:isbn', routes.getCount);

    // app.get('/error', function (req, res) {
    //     throw new Error('forced error');
    // });


    app.use(error.clientError);
    app.use(error.serverError);

    return app;
};