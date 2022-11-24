import Lot from "./Lot";

export default class Investment {

    /**
     * @param {String} ticker 
     * @param {String} type 
     * @param {Integer} quantity 
     */
    constructor(id = -1, ticker = "", type = "") {
        // Id and ticker
        this.id = id;
        this.ticker = ticker;
        // What kind of investment
        this.type = type;
        // Quantity and prices
        this.quantity = 0;
        this.amtBought = 0;
        this.avgPrice = 0;
        // Lots
        this.lots = {}
    }

    getId() {
        return this.id;
    }

    getTicker() {
        return this.ticker;
    }

    getType() {
        return this.type;
    }

    getQuantity() {
        return this.quantity;
    }

    getAmountBought() {
        return this.amtBought;
    }

    getAveragePrice() {
        return this.avgPrice;
    }

    getLots() {
        return this.lots;
    }

    hasLot(lotId) {
        return (lotId in this.lots);
    }

    getLot(lotId) {
        return (this.hasLot(lotId)) ? this.lots[lotId] : new Lot();
    }

    addLot(lotId, lotQuantity, lotPricePaid, lotTradeDate) {
        if (!this.hasLot(lotId)) {
            // Add the lot to the map of lots
            this.lots[lotId] = new Lot(lotId, lotQuantity, lotPricePaid, lotTradeDate);
            // Update the quantities to be total
            this.quantity += lotQuantity;
            // Update the price metrics of the investment
            this.amtBought += (lotQuantity * lotPricePaid);
            this.avgPrice = (this.amtBought / this.quantity);
        }
    }

}
