module.exports = function (username, password) {
    return function (req, res, next) {
        var credentials = {name: 'test', pass: 'test'};
        if (credentials && credentials.name === username && credentials.pass === password) {
            next();
        } else {
            res.setHeader('WWW-Authenticate', 'Basic realm=book inventory access');
            res.status(401).send('Access denied');
        }
    };
};