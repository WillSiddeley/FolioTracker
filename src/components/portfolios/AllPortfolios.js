import React from 'react';
const api = require("../../api/api");

export default class AllPortfolios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            portfolios: {}
        }
    }

    componentDidMount() {
        this.getPortfolios();
    }

    getPortfolios() {
        // Fetch from database
        const url = `/api/v1/portfolios/${this.state.userId}`;
        api.default.get(url).then(res => {
            // Sort into portfolio, investment, lot
            res.data.forEach(row => {
                if (row.portfolio_id in this.state.portfolios) {

                } else {
                    this.state.portfolios[row.portfolio_id] = {}
                }
            });

            console.log(res.data)
            this.setState({ portStr: res.data.join(", ") })
            this.setState({ data: res.data });
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.portStr}</p>
            </div>
        )
    }

}