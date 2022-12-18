import React from 'react';
import Account from "../../classes/Account";
import PortfolioList from "./PortfolioList";
import HoldingsChart from "./HoldingsChart";

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
            portfolioList.push(<PortfolioList key={item} portfolio={portfolioHash[item]} refresh={this.getPortfolios}/>)
        });
        return portfolioList;
    }

    render = () => {
        if (this.state.loading) {
            return <p>Loading...</p>
        }
        else {
            return (
                <div>
                    <div className="row">
                        <div className="col">
                            <HoldingsChart account={ this.state.account } />
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Value</h5>
                                    <p className="card-text">$1000</p>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Returns</h5>
                                    <p className="card-text">10%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                { this.renderPortfolio() }
                </div>
            )
        }
    }

}