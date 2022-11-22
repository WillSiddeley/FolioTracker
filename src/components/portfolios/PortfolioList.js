import React from "react";
import Portfolio from "../../classes/Portfolio";
import InvestmentList from "./InvestmentList";

export default class PortfolioList extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            portfolio: props.portfolio
        }
    }

    renderInvestments = () => {
        var investList = [];
        var investHash = this.state.portfolio.getInvestments();
        var investKeys = Object.keys(investHash);
        // Loop over each investment and add the component to the list
        investKeys.forEach((item, index) => {
            console.log("investhash")
            console.log(investHash[item])
            investList.push(<InvestmentList key={item} investment={investHash[item]}/>);
        });
        return investList;
    }

    render = () => {
        return (
            <div>
                <h3>Portfolio - {this.state.portfolio.getName()}</h3>
                { this.renderInvestments() }
            </div>
        )
    }
}