var express = require('express');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var User = require('./user');

module.exports = function(req, res, next) {

    var secretKey = 'supersecretkey';


    // alternative: Authorization: Basic [jwt]
    var token = req.headers['x-auth'];
    // username can be decoded w/o going to a DB or central authentication server - important for uservice architecture
    try {
        var auth = jwt.decode(token, secretKey);
        User.findOne({username: auth.username}, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            res.send('success');
        });
    } catch (e) {
        console.error(e);
        res.status(401).send('Token verification failed');
    }



    // return function(req, res, next) {
    //     var credentials = auth(req);
    //     if (credentials && credentials.name === username && credentials.pass === password) {
    //         next();
    //     } else {
    //         res.setHeader('WWW-Authenticate', 'Basic realm=book inventory access');
    //         res.status(401).send('Access denied');
    //     }
    // };
};