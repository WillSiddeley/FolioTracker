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

    addInvestment(investId, investTicker, investType) {
        if (!this.hasInvestment(investId)) this.investments[investId] = new Investment(investId, investTicker, investType);
    }

    
}