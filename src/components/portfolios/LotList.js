import React from "react";

export default class LotList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lot: props.lot,
            quantity: props.lot.getQuantity(),
            pricePaid: props.lot.getPricePaid(),
            tradeDate: props.lot.getTradeDate()
        }
    }

    getTxType = () => {
        return (this.state.quantity > 0 ? "Buy" : "Sell");
    }

    render() {
        return (
            <tr>
                <td>{ this.getTxType() }</td>
                <td colSpan={2}>{ this.state.quantity  }</td>
                <td colSpan={2}>{ this.state.pricePaid }</td>
                <td colSpan={2}>{ this.state.tradeDate }</td>
            </tr>
        )
    }

}

