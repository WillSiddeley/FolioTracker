const pg = require("pg");

var config = {
    user:       'deathyvoid',
    password:   'DEATHYVOID',
    database:   'foliotracker',
    host:       'localhost',
    port:       5432,
    max:        10,
    statement_timeout: 15000,
    idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

pool.on('error', function(err, client) {
    log.logToConsole("Idle client error", [err.message, err.stack], "ERROR");
});

const queryPromise = (text, values) => {
    return new Promise((resolve, reject) => {
        const callback = (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        }
        log.logToConsole("Querying the database", [text, values]);
        pool.query(text, values, callback);
    });
};

module.exports.query = function(text, values, callback) {
    log.logToConsole("Querying the database", [text, values]);
    return pool.query(text, values, callback);
};

module.exports.connect = function(callback) {
    return pool.connect(callback);
}