import React from 'react';
const api = require("../../api/api");

export default class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            portStr: ""
        }
    }

    componentDidMount() {
        this.getPortfolio();
    }

    getPortfolio() {
        // Fetch from database
        const url = `/api/v1/portfolios/${this.state.userId}`;
        api.default.get(url).then(res => {
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