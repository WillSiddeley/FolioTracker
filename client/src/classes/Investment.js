import Lot from "./Lot";

export default class Investment {

    /**
     * @param {String} ticker 
     * @param {String} type 
     * @param {Integer} quantity 
     */
    constructor(id = -1, type = "", ticker = "", fullname = "") {
        // Set id
        this.id = id;
        // What kind of investment
        this.type = type;
        this.ticker = ticker;
        this.fullname = fullname;
        // Quantity and prices
        this.quantity = 0;
        this.amtBought = 0;
        this.avgPrice = 0;
        // Market value (per share)
        this.marketValue = null;
        // Lots
        this.lots = {}
    }

    getId() {
        return this.id;
    }

    getType() {
        return this.type;
    }

    getTicker() {
        return this.ticker;
    }

    getFullname() {
        return this.fullname;
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

    getMarketValue() {
        return this.marketValue
    }

    setMarketValue(marketValue) {
        this.marketValue = marketValue;
    }

    getTotalValue() {
        return (this.marketValue === null) ? 0 : this.marketValue * this.quantity;
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

    addLot(lot) {
        if (!this.hasLot(lot.lot_id)) {
            // Add the lot to the map of lots
            this.lots[lot.lot_id] = new Lot(
                lot.lot_id, 
                lot.lot_quantity, 
                lot.lot_price_paid, 
                lot.lot_trade_date
            );
            // Update the quantities to be total
            this.quantity += lot.lot_quantity;
            // Update the price metrics of the investment
            this.amtBought += (lot.lot_quantity * lot.lot_price_paid);
            this.avgPrice = (this.amtBought / this.quantity);
        }
    }

}
