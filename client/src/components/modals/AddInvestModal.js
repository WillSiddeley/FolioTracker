import React from "react";
import api from "../../api/api";
import WebConstants from "../../constants/WebConstants";

export default class AddInvestModal extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            portfolioId: props.portfolioId,
            investTypes: [],
            form: {
                inputTicker: null,
                inputType: 1,
                inputAmount: null,
                inputPrice: null,
                inputDate: null
            }
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
                types.push(<option key={row.id} value={row.id}>{ row.name }</option>)
            });
            this.setState({
                investTypes: types
            })
        }).catch(err => {
            console.log(err);
        });
    }

    handleChange = (event) => {
        // Create a new form to store the old form
        let newForm = { ...this.state.form }
        // If this is the ticker field set input to uppercase
        let value = (event.target.id === "inputTicker") ? event.target.value.toUpperCase() : event.target.value;
        // Make the change to the new form
        newForm[event.target.id] = value;
        // Set the state form to the new form
        this.setState({ form: newForm });
        console.log(this.state.form)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Send a post request to the server
        const url = `${WebConstants.websiteAPI}/api/v1/portfolios/invest/addInvestment`;
        api.post(url, {
            portfolioId:    this.state.portfolioId,
            inputTicker:    this.state.form.inputTicker,
            inputType:      this.state.form.inputType,
            inputAmount:    this.state.form.inputAmount,
            inputPrice:     this.state.form.inputPrice,
            inputDate:      this.state.form.inputDate
        }).then(_ => {
            // Rerender portfolio
            this.props.refresh();
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputTicker">Ticker</label>
                                    <input name="ticker" type="text" onChange={this.handleChange} style={{ textTransform: 'uppercase' }} className="form-control" id="inputTicker" aria-describedby="tickerHelp" placeholder="Enter a ticker" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputType">Investment Type</label>
                                    <select name="type" onChange={this.handleChange}  className="form-control" id="inputType" required>
                                        { this.state.investTypes }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputAmount">Amount</label>
                                    <input name="amount" type="number" onChange={this.handleChange} className="form-control" id="inputAmount" aria-describedby="amountHelp" placeholder="Enter amount bought" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPrice">Price</label>
                                    <input name="price" type="decimal" onChange={this.handleChange} className="form-control" id="inputPrice" aria-describedby="priceHelp" placeholder="Enter the price per unit" required/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDate">Trade Date</label>
                                    <input name="tradeDate" type="date" onChange={this.handleChange} className="form-control" id="inputDate" aria-describedby="dateHelp" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <input type="submit" value="Submit" data-bs-dismiss="modal"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}