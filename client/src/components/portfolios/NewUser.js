import React from "react";
import AddPortfolioModal from "../modals/AddPortfolioModal";
import ItemCard from "../small/ItemCard";

export default class NewUser extends React.Component {

    constructor(props) {
        super(props);
    }

    getButton = () => {
        return (
            <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#addPortfolioModal">Create a new portfolio</button>
        )
    }

    render = () => {
        return (
            <div id="newUser">
                <div style={{ width: '60%', height: '33%', margin: 'auto' }}>
                    <ItemCard title="It seems you do not have any portfolios..." message={ this.getButton() } />
                </div>
                <AddPortfolioModal userId={ this.props.userId } refresh={ this.props.refresh } />
            </div>
        )
    }

}