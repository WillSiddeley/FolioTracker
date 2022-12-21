import React from "react";
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
            fullname: props.investment.getFullname(),
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
            // Get the market value from the API
            let lastPrice = res.data.regularMarketPrice
            // Set the object market value to update parents
            this.state.investment.setMarketValue(lastPrice)
            // Calculate market value * number of shares
            let marketValue = lastPrice * this.state.quantity;
            // Set state to update component
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
                <td colSpan={2}>Quantity</td>
                <td colSpan={2}>Price Paid</td>
                <td colSpan={2}>Trade Date</td>
            </tr>
        )
    }

    render = () => {
        return (
            <tbody>
                <tr onClick={ () => this.setState({ dropdown: !this.state.dropdown }) } className="lightHover">
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
}