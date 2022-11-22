import React from "react";
import Portfolio from "../../classes/Investment";
import LotList from "./LotList";

export default class InvestmentList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            dropdown: false,
            investment: props.investment
        }
    }

    handleOpen = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    renderLots = () => {
        var lotList = [];
        var lotHash = this.state.investment.getLots();
        var lotKeys = Object.keys(lotHash);
        // Loop over each lot and add the component to the list
        lotKeys.forEach((item, index) => {
            lotList.push(<li key={item}><LotList key={item} lot={lotHash[item]}/></li>);
        });
        return lotList;
    }

    render = () => {
        return (
            <div className="investList">
                <span>{ this.state.investment.getTicker() }</span>
                <span>{}</span>
                <div className="investListDropdown">
                    <button onClick={this.handleOpen}>v</button>
                    { this.state.dropdown ? (<ul className="investListMenu">{ this.renderLots() }</ul>) : null }
                </div>
                
            </div>
        )
    }

}