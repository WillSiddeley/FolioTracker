const log = require("../services/log");
const yf = require("yahoo-finance");

module.exports.quote = function(symbol, modules, callback) {
    modules = modules || ["price", "summaryDetail"]
    log.logToConsole("Querying Yahoo Finance API", [symbol, modules]);
    return yf.quote({ symbol: symbol, modules: modules }, callback)
}