import React from "react";
import InvestmentList from "./InvestmentList";
import AddInvestModal from "../modals/AddInvestModal";

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
            investList.push(<InvestmentList key={item} investment={investHash[item]}/>);
        });
        return investList;
    }

    render = () => {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" colSpan={6}>Portfolio - {this.state.portfolio.getName()}</th>
                        </tr>
                        <tr>
                            <th scope="col">Ticker</th>
                            <th scope="col">Market Value</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Average Price</th>
                            <th scope="col">Last Price</th>
                            <th scope="col">Unrealized P/L</th>
                        </tr>
                    </thead>
                    { this.renderInvestments() }
                    <tbody>
                        <tr>
                            <td colSpan={6}>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInvestModal">Add a new entry</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <AddInvestModal portfolioId={this.state.portfolio.getId()} refresh={this.props.refresh}/>
            </div>
        );
    }
}