import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend)

export default class HoldingsChart extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
            isDataSet: false,
            data: {
                labels: [],
                datasets: [{
                    data: []
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
        if (!this.state.isDataSet) this.setPieData();
    }

    setPieData = () => {
        for (let [keyP, portfolio] of Object.entries(this.state.account.portfolios)) {
            for (let [keyI, investment] of Object.entries(portfolio.investments)) {
                this.state.data.labels.push(investment.ticker);
                this.state.data.datasets[0].data.push(investment.amtBought);
            }
        }
    }

    render = () => {
        return (
            <Pie data={ this.state.data } options={ this.state.options }/>
        );
    }


}