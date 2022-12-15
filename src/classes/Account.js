import Portfolio from "./Portfolio";
import Investment from "./Investment";
import Lot from "./Lot";

export default class Account {

    constructor(userId) {
        this.userId = userId;
        this.portfolios = {}
    }

    getAccountPortfolios() {
        return this.portfolios;
    }

    accountHasPortfolio(lot) {
        return (lot.portfolio_id in this.portfolios);
    }

    getAccountPortfolio(lot) {
        return (this.accountHasPortfolio(lot)) ? this.portfolios[lot.portfolio_id] : new Portfolio();
    }

    addAccountPortfolio(lot) {
        if (!this.accountHasPortfolio(lot)) this.portfolios[lot.portfolio_id] = new Portfolio(lot.portfolio_id, lot.portfolio_name);      
    }

    accountHasInvestment(lot) {
        return this.getAccountPortfolio(lot).hasInvestment(lot.invest_id);
    }

    getAccountInvestment(lot) {
        return this.getAccountPortfolio(lot).getInvestment(lot.invest_id);
    }

    addAccountInvestment(lot) {
        if (!this.accountHasPortfolio(lot)) this.addAccountPortfolio(lot);
        if (!this.accountHasInvestment(lot)) this.getAccountPortfolio(lot).addInvestment(lot);
    }

    accountHasLot(lot) {
        return this.getAccountInvestment(lot).hasLot(lot.lot_id);
    }

    getAccountLot(lot) {
        return this.getAccountInvestment(lot).getLot(lot.lot_id);
    }

    addAccountLot(lot) {
        if (!this.accountHasPortfolio(lot)) this.addAccountPortfolio(lot);
        if (!this.accountHasInvestment(lot)) this.addAccountInvestment(lot);
        if (!this.accountHasLot(lot)) this.getAccountInvestment(lot).addLot(lot);
    }

    getAccountLabels() {

    }

    getAccountData() {

    }

}