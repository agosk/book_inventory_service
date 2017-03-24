/**
 * Created by skaczmarek on 23.03.2017.
 */
var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/booksdb';


var connectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0});
var collectionPromise = connectionPromise.then(function (db) {
    return db.collection('books-47857647563-s')
});


function stockUp(isbn, count) {

    return collectionPromise.then(function (collection) {
        return collection.updateOne({isbn: isbn}, {
            isbn: isbn,
            count: count
        }, {upsert: true});

    })
}
function findAll() {

    return collectionPromise.then(function (collection) {
        return collection.find({}).toArray();
    })

}

function getCount(isbn) {
    return collectionPromise.then(function (collection) {
        return collection.find({isbn: isbn}).limit(1).next();
    })
}


module.exports = {
    stockUp: stockUp,
    findAll: findAll,
    findOne: getCount
};

