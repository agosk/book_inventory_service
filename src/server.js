/**
 * Created by skaczmarek on 23.03.2017.
 */

var stockRepository = require('./StockRepository');
var app = require('./index')(stockRepository);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});








