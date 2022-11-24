import React from "react";
import Portfolio from "../../classes/Investment";
import LotList from "./LotList";
import api from "../../api/api";

export default class InvestmentList extends React.Component {

    constructor (props) {
        super(props);
        // Set initial state
        this.state = {
            dropdown: false,
            investment: props.investment,
            // Helper variables
            ticker: props.investment.getTicker(),
            quantity: props.investment.getQuantity(),
            averagePrice: props.investment.getAveragePrice(),
            amountBought: props.investment.getAmountBought(),
            // Placeholder values
            lastPrice: "",
            marketValue: "",
            // Calculated values
            unrealizedPL: ""
        }
    }

    componentDidMount = () => {
        // Call helper functions
        this.getMarketValue();
    }

    getMarketValue = () => {
        const url = `/api/v1/quotes/getPrice/${this.state.ticker}`;
        api.get(url).then(res => {
            let lastPrice = res.data.regularMarketPrice
            let marketValue = lastPrice * this.state.quantity;
            this.setState({
                lastPrice: lastPrice,
                marketValue: marketValue,
                unrealizedPL: marketValue - this.state.amountBought
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                lastPrice: "Err",
                marketValue: "Err"
            });
        });
    }

    renderLotList = () => {
        var lotList = [];
        var lotHash = this.state.investment.getLots();
        var lotKeys = Object.keys(lotHash);
        // Loop over each lot and add the component to the list
        lotKeys.forEach((item, index) => {
            lotList.push(<LotList key={item} lot={lotHash[item]}/>);
        });
        return lotList;
    }

    renderLotHead = () => {
        return (
            <tr>
            </tr>
        )
    }

    render = () => {
        return (
            <tbody>
                <tr>
                    <td><button onClick={ () => this.setState({ dropdown: !this.state.dropdown }) }>v</button></td>
                    <td>{   this.state.ticker         }</td>
                    <td>{   this.state.marketValue    }</td>
                    <td>{   this.state.quantity       }</td>
                    <td>{   this.state.averagePrice   }</td>
                    <td>{   this.state.lastPrice      }</td>
                    <td>{   this.state.unrealizedPL   }</td>
                </tr>
                { this.state.dropdown ? this.renderLotHead() : null }
                { this.state.dropdown ? this.renderLotList() : null }
            </tbody>
        )
    }

    /*{ this.state.dropdown ? this.renderLots() : null }
        <div className="investListDropdown">
                <button onClick={this.handleOpen}>v</button>
                { this.state.dropdown ? (<ul className="investListMenu">{ this.renderLots() }</ul>) : null }
        </div>
    */

}