import React from "react";
import Lot from "../../classes/Lot";

export default class LotList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lot: props.lot
        }
        this.lot = this.state.lot
    }

    render() {
        return (
            <p>Quantity - {this.lot.getQuantity()}, Price Paid - {this.lot.getPricePaid()}</p>
        )
    }

}