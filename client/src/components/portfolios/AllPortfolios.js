import React from 'react';
import Account from "../../classes/Account";
import PortfolioList from "./PortfolioList";
import HoldingsChart from "./HoldingsChart";
import ItemCard from '../small/ItemCard';

const api = require("../../api/api");

export default class AllPortfolios extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            userId: props.userId,
            account: new Account(props.userId),
            loading: true
        }
    }

    componentDidMount = () => {
        this.getPortfolios();
    }

    getPortfolios = () => {
        // Set loading to true
        this.setState({ loading: true });
        // Fetch from database
        const url = `/api/v1/portfolios/${this.state.userId}`;
        api.default.get(url).then(res => {
            // Sort into portfolio
            res.data.forEach(lot => {
                this.state.account.addAccountLot(lot);
            });
            this.setState({ loading: false });
        });
    }

    renderPortfolio = () => {
        var portfolioList = [];
        var portfolioHash = this.state.account.getAccountPortfolios()
        var portfolioKeys = Object.keys(portfolioHash);
        // Loop over each portfolio and add the component to the list
        portfolioKeys.forEach((item, index) => {
            portfolioList.push(
                <div className="row mx-auto p-5">
                    <PortfolioList key={item} portfolio={portfolioHash[item]} refresh={this.getPortfolios}/>
                </div>
            )
        });
        return portfolioList;
    }

    render = () => {
        if (this.state.loading) {
            return <p>Loading...</p>
        }
        else {
            return (
                <div className="container">
                    <div className="row mx-auto p-5">
                        <div className="col-7">
                            <HoldingsChart account={ this.state.account } />
                        </div>
                        <div className="col-5">
                            <ItemCard title={ "Total Value" } message={ this.state.account.getTotalValue() } />
                            <ItemCard title={ "Simple Return Rate" } message={ "1000" } />
                            <ItemCard title={ "Time Weighted Return Rate" } message={ "1000" } />
                            <ItemCard title={ "Money Weighted Return Rate" } message={ "1000" } />
                        </div>
                    </div>
                { this.renderPortfolio() }
                </div>
            )
        }
    }

}