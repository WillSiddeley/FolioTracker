import React from "react";


export default class AddPortfolioModal extends React.Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="modal fade" id="addPortfolioModal" tabIndex="-1" aria-labelledby="addPortfolioModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add New Portfolio</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}