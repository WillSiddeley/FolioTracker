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
    quantity FLOAT,
    last_price MONEY
);

CREATE TABLE invest.lot (
    id SERIAL UNIQUE,
    investment_ref INTEGER, CONSTRAINT investment_ref_fk FOREIGN KEY(investment_ref) REFERENCES invest.investment(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity FLOAT,
    price_paid MONEY,
    trade_date DATE
);

CREATE TYPE account_holdings AS (
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
);

CREATE OR REPLACE FUNCTION get_account_holdings(userId INTEGER)
    RETURNS SETOF account_holdings
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
WHERE p.user_ref = userId;
$$
LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_or_add_ticker(symbol_name VARCHAR(10))
    RETURNS INTEGER
AS
$$
DECLARE ticker_id INTEGER;
BEGIN
    -- Lock table
    LOCK TABLE info.tickers IN SHARE ROW EXCLUSIVE MODE;
    -- Look for the ID
    SELECT id INTO ticker_id FROM info.tickers WHERE symbol = symbol_name;
    -- If the ID does not exist, insert it into the table
    IF ticker_id IS NULL THEN
        INSERT INTO info.tickers (symbol, name) VALUES (symbol_name, NULL) RETURNING id INTO ticker_id;
    END IF;
    -- Return ticker ID
    RETURN ticker_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_or_add_invest_type(invest_type VARCHAR(10))
    RETURNS INTEGER
AS
$$
DECLARE ticker_id INTEGER;
BEGIN
    -- Lock table
    LOCK TABLE info.tickers IN SHARE ROW EXCLUSIVE MODE;
    -- Look for the ID
    SELECT id INTO ticker_id FROM info.tickers WHERE symbol = symbol_name;
    -- If the ID does not exist, insert it into the table
    IF ticker_id IS NULL THEN
        INSERT INTO info.tickers (symbol, name) VALUES (symbol_name, NULL) RETURNING id INTO ticker_id;
    END IF;
    -- Return ticker ID
    RETURN ticker_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_or_add_portfolio(portfolio_name VARCHAR(255), user_id INTEGER)
    RETURNS INTEGER
AS
$$
DECLARE portfolio_id INTEGER;
BEGIN
    -- Lock table
    LOCK TABLE invest.portfolio IN SHARE ROW EXCLUSIVE MODE;
    -- Look for the ID
    SELECT id INTO portfolio_id FROM invest.portfolio WHERE name = portfolio_name AND user_ref = user_id;
    -- If the ID does not exist, insert it into the table
    IF portfolio_id IS NULL THEN
        INSERT INTO invest.portfolio (name, user_ref) VALUES (portfolio_name, user_id) RETURNING id INTO portfolio_id;
    END IF;
    -- Return portfolio ID
    RETURN portfolio_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_or_add_investment(portfolio_id INTEGER, ticker_id INTEGER, invest_type_id INTEGER)
    RETURNS INTEGER
AS
$$
DECLARE investment_id INTEGER;
BEGIN
    -- Lock table
    LOCK TABLE invest.investment IN SHARE ROW EXCLUSIVE MODE;
    -- Look for the ID
    SELECT id INTO investment_id FROM invest.investment WHERE portfolio_ref = portfolio_id AND ticker_ref = ticker_id AND investment_type_ref = invest_type_id;
    -- If the ID does not exist, insert it into the table
    IF investment_id IS NULL THEN
        INSERT INTO invest.investment (portfolio_ref, ticker_ref, investment_type_ref) VALUES (portfolio_id, ticker_id, invest_type_id) RETURNING id INTO investment_id;
    END IF;
    -- Return investment ID
    RETURN investment_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION get_or_add_lot(investment_id INTEGER, _quantity FLOAT, _price_paid MONEY, _trade_date DATE)
    RETURNS INTEGER
AS
$$
DECLARE lot_id INTEGER;
BEGIN
    -- Lock table
    LOCK TABLE invest.lot IN SHARE ROW EXCLUSIVE MODE;
    -- Look for the ID
    SELECT id INTO lot_id FROM invest.lot WHERE investment_ref = investment_id AND quantity = _quantity AND price_paid = _price_paid AND trade_date = _trade_date;
    -- If the ID does not exist, insert it into the table
    IF lot_id IS NULL THEN
        INSERT INTO invest.lot (investment_ref, quantity, price_paid, trade_date) VALUES (investment_id, _quantity, _price_paid, _trade_date) RETURNING id INTO lot_id;
    END IF;
    -- Return lot ID
    RETURN lot_id;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION add_new_invest_lot(portfolio_id INTEGER, symbol_name TEXT, invest_type_ref INTEGER, quantity INTEGER, price_paid MONEY, trade_date DATE)
    RETURNS INTEGER
AS
$$
DECLARE type_ref INTEGER;
DECLARE ticker_ref INTEGER;
DECLARE invest_ref INTEGER;
DECLARE lot_ref INTEGER;
BEGIN
    -- Lock table 
    LOCK TABLE invest.lot IN SHARE ROW EXCLUSIVE MODE;
    -- Find the ticker symbol if it does not already exist
    SELECT id INTO ticker_ref FROM get_or_add_ticker(symbol_name) AS id;
    -- Create the investment if it does not already exist
    SELECT id INTO invest_ref FROM get_or_add_investment(portfolio_id, ticker_ref, invest_type_ref) AS id;
    -- Create the lot information
    SELECT id INTO lot_ref FROM get_or_add_lot(invest_ref, quantity, price_paid, trade_date) AS id;
    -- Return lot ID
    RETURN lot_ref;
END
$$
LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION update_last_price(symbol_name TEXT, new_price MONEY)
    RETURNS BOOLEAN
AS
$$
DECLARE ticker_id INTEGER;
DECLARE success BOOLEAN;
BEGIN
    -- Get the ticker ID
    SELECT id FROM info.tickers WHERE symbol = symbol_name LIMIT 1 INTO ticker_id;
    -- If we cannot find an associated ticker, return false
    IF ticker_id IS NULL THEN
        RETURN FALSE;
    ELSE
        UPDATE invest.investment SET last_price = new_price WHERE ticker_ref = ticker_id;
    END IF;
    -- Return true indicating success
    RETURN TRUE;
END
$$
LANGUAGE PLPGSQL;