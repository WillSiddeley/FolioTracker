
export default class Lot {

    /**
     * 
     * @param {Investment} Investment 
     * @param {Integer} quantity 
     * @param {Float} pricePaid 
     * @param {Date} tradeDate 
     */
    constructor(id = -1, quantity = 0, pricePaid = 0, tradeDate = new Date()) {
        this.id = id;
        this.quantity = quantity;
        this.pricePaid = pricePaid;
        this.tradeDate = tradeDate;
    }

    getQuantity() {
        return this.quantity;
    }

    getPricePaid() {
        return this.pricePaid;
    }

    getTradeDate() {
        return this.tradeDate;
    }

}