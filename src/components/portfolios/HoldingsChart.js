import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend)

export default class HoldingsChart extends React.PureComponent {

    emptyData = {
        labels: [],
            datasets: [{
                data: []
            }
        ]
    }

    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
            data: {
                labels: props.accountLabels,
                datasets: [{
                    data: props.accountData
                }]
            },
            options: {
                tooltips: {
                    enabled: true
                },
                legend: {
                    display: true
                }
            }
        }
    }

    componentDidMount = () => {
        this.setPieData();
    }

    setPieData = () => {
        // Add the holdings to the chart
        for (let [_, portfolio] of Object.entries(this.state.account.portfolios)) {
            for (let [_, investment] of Object.entries(portfolio.investments)) {
                this.state.data.labels.push(investment.ticker);
                this.state.data.datasets[0].data.push(investment.amtBought);
            }
        }
        console.log(this.state.data)
    }

    render = () => {
        return (
            <Pie data={ this.state.data } options={ this.state.options }/>
        );
    }


}