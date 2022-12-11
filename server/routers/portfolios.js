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
    poolQuery(res, `
    SELECT 
        portfolio_id, 
        portfolio_name, 
        invest_id, 
        invest_type, 
        invest_ticker, 
        invest_fullname, 
        lot_id, 
        lot_quantity, 
        lot_price_paid, 
        lot_trade_date 
    FROM get_account_holdings(${req.params.userId}) as (
        portfolio_id integer,
        portfolio_name varchar, 
        invest_id integer, 
        invest_type varchar, 
        invest_ticker varchar, 
        invest_fullname varchar, 
        lot_id integer, 
        lot_quantity float, 
        lot_price_paid float, 
        lot_trade_date date
    );`);
}

// Get investment types
exports.getInvestmentTypes = function(req, res) {
    poolQuery(res, `SELECT id, type, name FROM info.investment_type;`);
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