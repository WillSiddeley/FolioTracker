// Imports
const cors = require("cors");
const express = require("express");
const log = require("./services/log");

// Express Settings
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routers
const quotes = require("./routers/quotes");
const portfolios = require("./routers/portfolios");

// GET Methods
app.get('/api/v1/quotes/getPrice/:ticker', quotes.getPrice);
app.get('/api/v1/portfolios/:userId', portfolios.getPortfolios);

// Open Port
app.listen(port, () => log.logToConsole("App listening on port", port));