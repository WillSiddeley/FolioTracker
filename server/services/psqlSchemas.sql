
CREATE SCHEMA info;

CREATE TABLE info.tickers (
    id SERIAL UNIQUE,
    symbol VARCHAR(10),
    name VARCHAR(255)
);

CREATE TABLE info.investment_type (
    id SERIAL UNIQUE,
    type VARCHAR(255),
    name VARCHAR(255)
);

CREATE SCHEMA users;

CREATE TABLE users.users (
    id SERIAL UNIQUE,
    name VARCHAR(255)
);

CREATE SCHEMA invest;

CREATE TABLE invest.portfolio (
    id SERIAL UNIQUE,
    name VARCHAR(255),
    user_ref INTEGER, CONSTRAINT user_ref_fk FOREIGN KEY(user_ref) REFERENCES users.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE invest.investment (
    id SERIAL UNIQUE,
    portfolio_ref INTEGER, CONSTRAINT portfolio_ref_fk FOREIGN KEY(portfolio_ref) REFERENCES invest.portfolio(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ticker_ref INTEGER, CONSTRAINT ticker_ref_fk FOREIGN KEY(ticker_ref) REFERENCES info.tickers(id),
    investment_type_ref INTEGER, CONSTRAINT investment_type_ref_fk FOREIGN KEY(investment_type_ref) REFERENCES info.investment_type(id),
    quantity FLOAT
);

CREATE TABLE invest.lot (
    id SERIAL UNIQUE,
    investment_ref INTEGER, CONSTRAINT investment_ref_fk FOREIGN KEY(investment_ref) REFERENCES invest.investment(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity FLOAT,
    price_paid MONEY
);

CREATE OR REPLACE FUNCTION get_account_holdings(userId INTEGER)
    RETURNS TABLE (
        portfolio_id INTEGER,
        portfolio_name TEXT,
        invest_id INTEGER,
        invest_type TEXT,
        invest_ticker TEXT,
        invest_fullname TEXT,
        lot_id INTEGER,
        lot_quantity FLOAT,
        lot_price_paid FLOAT,
        lot_trade_date TEXT
    )
AS
$$
SELECT 
    p.id AS portfolio_id, 
    p.name AS portfolio_name, 
    i.id AS invest_id, 
    it.name AS invest_type, 
    tn.symbol AS invest_ticker,
    tn.name AS invest_fullname, 
    l.id AS lot_id, 
    l.quantity AS lot_quantity, 
    l.price_paid::numeric::float8 AS lot_price_paid, 
    l.trade_date AS lot_trade_date
FROM invest.portfolio p
JOIN invest.investment i ON i.portfolio_ref = p.id
JOIN invest.lot l ON l.investment_ref = i.id
JOIN info.tickers tn ON tn.id = i.ticker_ref
JOIN info.investment_type it ON it.id = i.investment_type_ref
WHERE p.user_ref = $1
$$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_or_add_ticker(newSym VARCHAR(10))
    RETURNS INTEGER
AS
$$
DECLARE ticker_id INTEGER;
BEGIN
    LOCK TABLE info.tickers IN SHARE ROW EXCLUSIVE MODE;
    INSERT INTO info.tickers (symbol, name)
    SELECT newSym, NULL 
        WHERE NOT EXISTS (
            SELECT * FROM info.tickers WHERE symbol = newSym
        )
        RETURNING id INTO ticker_id;
        RETURN ticker_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION add_new_investment(portfolio_id INTEGER, ticker TEXT, type TEXT, amount INTEGER, price MONEY, trade_date DATE)
    RETURNS INTEGER
AS
$$
-- Get the investment id
DECLARE @invest_ref INTEGER
-- Add the ticker if it doesn't already exist
DECLARE @ticker_ref INTEGER
-- Get the investment type
DECLARE @type_ref INTEGER




-- Find if the investment already exists
SELECT @invest_ref := 

$$
