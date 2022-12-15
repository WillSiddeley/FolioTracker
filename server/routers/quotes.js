const pool = require("../services/pg");
const log = require("../services/log");
const yf = require("../services/yf");

// Get the current value of a ticker
exports.getPrice = function(req, res) {
    const ticker = req.params.ticker;
    yf.quote(ticker, ['price']).then(queryRes => {
        res.json(queryRes.price);
        // Query string to call the update last price PostgreSQL function
        const queryString = `SELECT * FROM update_last_price('${ticker}', '$${queryRes.price.regularMarketPrice}')`
        // Query the database with the queryString and log if there are errors
        pool.query(queryString).then(res => { 
            if (res.rows.update_last_price == false) {
                log.logToConsole("Error updating last price", res.rows, "ERROR")
            }
        }).catch(err => {
            log.logToConsole("Error updating last price", err, "ERROR")
        });
    }).catch(err => {
        log.logToConsole("Error getting ticker price", err, "ERROR");
        res.status(500).send();
    });
}
