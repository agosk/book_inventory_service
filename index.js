var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stockRepository = require('./StockRepository');


function logRequest(req, res, next) {
    console.log('incoming request at ', new Date());
    next();
}


function auth(req, res, next) {
    console.log('you can pass my auth');
    next();
}


// middleware - cross cutting concerns
app.use(logRequest);
app.use(auth);
app.use(bodyParser.json());

// handler/routes
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/stock', function (req, res, next) {

    stockRepository.stockUp(req.body.isbn, req.body.count)
        .then(function () {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            });
        });

});

app.get('/stock', function (req, res, next) {
    stockRepository.findAll()
        .then(function (results) {
            res.json(results);
        }).catch(next);
});

app.get('/stock/:isbn', function (req, res, next) {
    stockRepository.findOne(req.params.isbn)
        .then(function (results) {
            if (results != null) {
                res.json(results);
            } else {
                var err = new Error('Book not Found');
                err.status = 404;
                res.status(err.status);
                res.send(err);
            }
        }).catch(next);
});

app.get('/error', function (req, res) {
    throw new Error('forced error');
});


// error handling
app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    console.error(err.stack);
    res.send('Oh no: ' + status);
}

module.exports = app;