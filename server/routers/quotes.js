const pool = require("../services/pg");
const log = require("../services/log");
const yf = require("../services/yf");

// Get the current value of a ticker
exports.getPrice = function(req, res) {
    const ticker = req.params.ticker;
    yf.quote(ticker, ['price']).then(queryRes => {
        res.json(queryRes.price);
    }).catch(err => {
        log.logToConsole(ticker, err, "ERROR");
        res.status(500).send();
    });
}
