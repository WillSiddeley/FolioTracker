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
    })
}