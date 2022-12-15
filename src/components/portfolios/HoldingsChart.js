import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import WebConstants from "../../constants/WebConstants";
import api from "../../api/api";
import randomColor from "randomcolor";

Chart.register(ArcElement, Tooltip, Legend)

export default class HoldingsChart extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            account: props.account,
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
        this.getPieData();
    }

    getPieData = () => {
        // Get the holdings data from the server
        const url = `${WebConstants.websiteAPI}/api/v1/portfolios/holdings/chart`;
        // Empty lists for response data
        let labels = [];
        let amount = [];
        api.get(url).then(res => {
            res.data.forEach(row => {
                // Get sum and price as floats
                let quantity = parseFloat(row.sum);
                let lastPrice = parseFloat(row.last_price.replace("$", ""));
                labels.push(row.symbol);
                amount.push((quantity * lastPrice).toFixed(2));
            });
            // Get random colors for the background of the pie chart
            let colors = randomColor({
                count: labels.length,
                hue: 'random'
            });
            // Set the state variables equal to the new data
            this.setState({ data: { 
                labels: labels, 
                datasets: [{ 
                    data: amount,
                    backgroundColor: colors
                }]
            }});
        });
    }

    render = () => {
        return (
            <Pie data={ this.state.data } options={ this.state.options }/>
        );
    }


}