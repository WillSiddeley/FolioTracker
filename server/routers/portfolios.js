const pool = require("../services/pg");
const log = require("../services/log");

function poolQuery(res, queryString) {
    pool.query(queryString).then(queryRes => {
        res.json(queryRes.rows);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    });
}

// Get all the users portfolios
exports.getPortfolios = function(req, res) {
    poolQuery(res, `SELECT * FROM get_account_holdings(${req.params.userId});`);
}

// Get investment types
exports.getInvestmentTypes = function(req, res) {
    poolQuery(res, `SELECT id, type, name FROM info.investment_type;`);
}

exports.addInvestment = function(req, res) {
    var portfolioId = req.body.portfolioId;
    var ticker      = req.body.inputTicker;
    var type        = req.body.inputType;
    var amount      = req.body.inputAmount;
    var price       = req.body.inputPrice;
    var tradeDate   = req.body.inputDate;
    console.log(portfolioId, ticker, type, amount, price, tradeDate);
    poolQuery(res, `SELECT * FROM add_new_invest_lot(${portfolioId}, '${ticker}', ${type}, ${amount}, '$${price}', '${tradeDate}')`)
}