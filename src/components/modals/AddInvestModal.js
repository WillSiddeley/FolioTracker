import React from "react";
import api from "../../api/api";
import WebConstants from "../../constants/WebConstants";

export default class AddInvestModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            portfolioId: props.portfolioId,
            investTypes: []
        }
    }

    componentDidMount = () => {
        // Call helper functions
        this.getInvestmentTypes();
    }

    getInvestmentTypes = () => {
        const url = `/api/v1/portfolios/invest/types`;
        api.get(url).then(res => {
            var types = [];
            res.data.forEach(row => {
                types.push(<option key={row.id}>{ row.name }</option>)
            });
            this.setState({
                investTypes: types
            })
        }).catch(err => {
            console.log(err);
        });
    }

    render = () => {
        return (
            <div className="modal fade" id="addInvestModal" tabIndex="-1" aria-labelledby="addInvestModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add New Investment</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action={`${WebConstants.websiteAPI}/api/v1/portfolios/invest/addInvestment`} method="post">
                            <div className="modal-body">
                                { /* Input hidden fields for additional data to send to server */ }
                                <input name="portfolioId" type="hidden" value={ this.state.portfolioId } />
                                <div className="form-group">
                                    <label htmlFor="inputTicker">Ticker</label>
                                    <input name="ticker" type="text" className="form-control" id="inputTicker" aria-describedby="tickerHelp" placeholder="Enter a ticker" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputType">Investment Type</label>
                                    <select name="type" className="form-control" id="inputType" required>
                                        { this.state.investTypes }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input name="amount" type="number" className="form-control" id="inputAmount" aria-describedby="amountHelp" placeholder="Enter amount bought" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPrice">Price</label>
                                    <input name="price" type="decimal" className="form-control" id="inputPrice" aria-describedby="priceHelp" placeholder="Enter the price per unit" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDate">Trade Date</label>
                                    <input name="tradeDate" type="date" className="form-control" id="inputDate" aria-describedby="dateHelp" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}