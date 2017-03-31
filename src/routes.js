module.exports = function (stockRepository) {


    return {
        hello: function (req, res) {
            res.send('-> Pong;');
        },
        stockUp: function (req, res, next) {

            stockRepository.stockUp(req.body.isbn, req.body.count)
                .then(function () {
                    res.json({
                        isbn: req.body.isbn,
                        count: req.body.count
                    });
                });

        },
        findAll: function (req, res, next) {
            stockRepository.findAll()
                .then(function (results) {
                    res.json(results);
                }).catch(next);
        },
        getCount: function (req, res, next) {
            stockRepository.findOne(req.params.isbn)
                .then(function (results) {
                    if (results != null) {
                        res.format({

                            'text/html': function () {
                                res.send('<p>' + results.count + ' copy left</p>');
                            },

                            'application/json': function () {
                                res.json(results);
                            },

                            'default': function () {
                                // log the request and respond with 406
                                res.status(406).send('Not Acceptable');
                            }
                        });
                    } else {
                        var err = new Error('Book not Found');
                        err.status = 404;
                        res.status(err.status);
                        res.send(err);
                    }
                }).catch(next);
        }
    }

};