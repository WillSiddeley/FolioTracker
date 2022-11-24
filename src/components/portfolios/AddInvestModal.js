import React from "react";


export default class AddInvestModal extends React.Component {

    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div class="modal fade" id="addInvestModal" tabindex="-1" aria-labelledby="addInvestModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Add New Investment</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}