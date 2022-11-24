const pool = require("../services/pg");
const log = require("../services/log");

// Get all the users portfolios
exports.getPortfolios = function(req, res) {
    const userId = req.params.userId;
    const queryString = `
    SELECT 
        p.id AS portfolio_id, 
        p.name AS portfolio_name, 
        i.id AS investment_id, 
        tn.symbol AS ticker,
        tn.name AS fullname, 
        it.name AS type, 
        i.quantity AS total_quantity, 
        l.id AS lot_id, 
        l.quantity AS lot_quantity, 
        l.price_paid::numeric::float8, 
        l.trade_date AS trade_date
    FROM invest.portfolio p
    JOIN invest.investment i ON i.portfolio_ref = p.id
    JOIN invest.lot l ON l.investment_ref = i.id
    JOIN info.tickers tn ON tn.id = i.ticker_ref
    JOIN info.investment_type it ON it.id = i.investment_type_ref
    WHERE p.user_ref = ${userId};
    `
    pool.query(queryString).then(queryRes => {
        res.json(queryRes.rows);
    }).catch(err => {
        console.log(err);
        res.status(500).send();
    })
}