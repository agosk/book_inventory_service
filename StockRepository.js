/**
 * Created by skaczmarek on 23.03.2017.
 */
var MongoClient = require('mongodb').MongoClient;
var stockRepository = require('./StockRepository');

var url = 'mongodb://localhost:27017/booksdb';


var connectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0});
var collectionPromise = connectionPromise.then(function (db) {
    return db.collection('book')
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


module.exports = {
    stockUp: stockUp,
    findAll: findAll
};

