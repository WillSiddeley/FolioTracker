import Portfolio from "./Portfolio";
import Investment from "./Investment";
import Lot from "./Lot";

export default class Account {

    constructor(userId) {
        this.userId = userId;
        this.portfolios = {}
    }

    /**
     * @returns {Object}
     */
    getAccountPortfolios() {
        return this.portfolios;
    }

    /**
     * @param {Integer} portfolioId 
     * @returns {Boolean}
     */
    accountHasPortfolio(portfolioId) {
        return (portfolioId in this.portfolios);
    }

    /**
     * @param {Integer} portfolioId 
     * @returns {Portfolio}
     */
    getAccountPortfolio(portfolioId) {
        return (this.accountHasPortfolio(portfolioId)) ? this.portfolios[portfolioId] : new Portfolio();
    }

    /**
     * @param {Integer} portfolioId 
     * @param {String} portfolioName 
     */
    addAccountPortfolio(portfolioId, portfolioName) {
        if (!this.accountHasPortfolio(portfolioId)) this.portfolios[portfolioId] = new Portfolio(portfolioId, portfolioName);      
    }

    /**
     * @param {Integer} portfolioId 
     * @param {Integer} investId 
     * @returns 
     */
    accountHasInvestment(portfolioId, investId) {
        return this.getAccountPortfolio(portfolioId).hasInvestment(investId);
    }

    /**
     * @param {Integer} portfolioId 
     * @param {Integer} investId 
     * @returns {Investment}
     */
    getAccountInvestment(portfolioId, investId) {
        return this.getAccountPortfolio(portfolioId).getInvestment(investId);
    }

    /**
     * @param {Integer} portfolioId 
     * @param {String} portfolioName 
     * @param {Integer} investId 
     * @param {String} investTicker 
     * @param {String} investType 
     */
    addAccountInvestment(portfolioId, portfolioName, investId, investTicker, investType) {
        if (!this.accountHasPortfolio(portfolioId)) this.addAccountPortfolio(portfolioId, portfolioName);
        if (!this.accountHasInvestment(portfolioId, investId)) this.getAccountPortfolio(portfolioId).addInvestment(investId, investTicker, investType);
    }

    /**
     * @param {Integer} portfolioId 
     * @param {Integer} investId 
     * @param {Integer} lotId 
     * @returns 
     */
    accountHasLot(portfolioId, investId, lotId) {
        return this.getAccountInvestment(portfolioId, investId).hasLot(lotId);
    }

    /**
     * @param {Integer} portfolioId 
     * @param {Integer} investId 
     * @param {Integer} lotId 
     * @returns {Lot}
     */
    getAccountLot(portfolioId, investId, lotId) {
        return this.getAccountInvestment(portfolioId, investId).getLot(lotId);
    }

    /**
     * @param {Integer} portfolioId 
     * @param {String} portfolioName 
     * @param {Integer} investId 
     * @param {String} investTicker 
     * @param {String} investType 
     * @param {Integer} lotId 
     * @param {Float} lotQuantity 
     * @param {Float} lotPricePaid 
     * @param {Date} lotTradeDate 
     */
    addAccountLot(portfolioId, portfolioName, investId, investTicker, investType, lotId, lotQuantity, lotPricePaid, lotTradeDate) {
        if (!this.accountHasPortfolio(portfolioId)) this.addAccountPortfolio(portfolioId, portfolioName);
        if (!this.accountHasInvestment(portfolioId, investId)) this.addAccountInvestment(portfolioId, portfolioName, investId, investTicker, investType);
        if (!this.accountHasLot(portfolioId, investId, lotId)) this.getAccountInvestment(portfolioId, investId).addLot(lotId, lotQuantity, lotPricePaid, lotTradeDate);
    }

}