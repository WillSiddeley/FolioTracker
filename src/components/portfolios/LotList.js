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
            <tr>
                <td colSpan={7}>Quantity - {this.lot.getQuantity()}, Price Paid - {this.lot.getPricePaid()}</td>
            </tr>
        )
    }

}

