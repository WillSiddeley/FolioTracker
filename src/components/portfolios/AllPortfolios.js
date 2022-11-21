import React from 'react';
import Account from "../../classes/Account";
import PortfolioList from "./PortfolioList"
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
        // Fetch from database
        const url = `/api/v1/portfolios/${this.state.userId}`;
        api.default.get(url).then(res => {
            // Sort into portfolio
            res.data.forEach(lot => {
                this.state.account.addAccountLot(
                    lot.portfolio_id, 
                    lot.portfolio_name, 
                    lot.investment_id, 
                    lot.ticker, 
                    lot.type, 
                    lot.lot_id, 
                    lot.lot_quantity, 
                    lot.price_paid, 
                    lot.trade_date
                );
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
            portfolioList.push(<PortfolioList key={item} portfolio={portfolioHash[item]}/>)
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
                    { this.renderPortfolio() }
                </div>
            )
        }
    }

}