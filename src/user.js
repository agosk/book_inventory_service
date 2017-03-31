var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth_demo');

var user = mongoose.Schema({
    username: {type: String},
    password: {type: String, select: false} // don't select it by default
});

module.exports = mongoose.model('User', user);
