const pool = require("../services/pg");
const log = require("../services/log");

// Get all the users portfolios
exports.getPortfolios = function(req, res) {
    const userId = req.params.userId;
    const queryString = `SELECT * FROM get_account_holdings(${req.params.userId});`
    pool.query(queryString).then(queryRes => {
        res.json(queryRes.rows);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    });
}

// Get investment types
exports.getInvestmentTypes = function(req, res) {
    const queryString = `SELECT id, type, name FROM info.investment_type;`
    pool.query(queryString).then(queryRes => {
        res.json(queryRes.rows);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    });
}

exports.addInvestment = function(req, res) {
    var portfolioId = req.body.portfolioId;
    var ticker = req.body.ticker;
    var type = req.body.type;
    var amount = req.body.amount;
    var price = req.body.price;
    var tradeDate = req.body.tradeDate;
    const queryString = `SELECT id FROM add_new_investment(
        ${portfolioId},
        '${ticker}', 
        '${type}', 
        ${amount}, 
        ${price}, 
        '${tradeDate}')`;
    pool.query(queryString).then(queryRes => {
        res.json(queryRes.rows);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    });
}