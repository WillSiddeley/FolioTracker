import React from "react";


export default class NotFound extends React.Component {

    constructor (props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                <h3>Oops! The page you are looking for doesn't seem to exist!</h3>
            </div>
        );
    }

}