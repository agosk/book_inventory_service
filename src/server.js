/**
 * Created by skaczmarek on 23.03.2017.
 */

const stockRepository = require('./StockRepository');
const auth = require('./auth');
const app = require('./index')({stockRepository, auth});

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
