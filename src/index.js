const express = require('express');
const bodyParser = require('body-parser');


module.exports = function ({stockRepository, auth}) {

    const error = require('./error');
    const routes = require('./routes')(stockRepository);


    const app = express();

    app.use(auth);

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