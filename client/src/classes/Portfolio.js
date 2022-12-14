import Investment from "./Investment";

export default class Portfolio {

    /**
     * @param {String} id 
     * @param {String} name 
     */
    constructor(id = -1, name = "") {
        this.id = id;
        this.name = name;
        this.investments = {};
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getInvestments() {
        return this.investments;
    }

    hasInvestment(investId) {
        return (investId in this.investments);
    }

    getInvestment(investId) {
        return (this.hasInvestment(investId)) ? this.investments[investId] : new Investment();
    }

    addInvestment(lot) {
        if (!this.hasInvestment(lot.invest_id)) {
            this.investments[lot.invest_id] = new Investment(
                lot.invest_id, 
                lot.invest_type, 
                lot.invest_ticker, 
                lot.invest_fullname
            );
        }
    }

    getTotalValue() {
        let totalValue = 0
        for (let investment in this.investments) {
            totalValue += this.investments[investment].getTotalValue();
        }
        return totalValue;
    }
    
}