import React from "react";


export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src={require('../../images/stock-chart-icon.png')} alt="Stock Chart"/>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-6">
                        <h1>Track your net worth and stock holdings</h1>
                        <p>Our webapp allows you to easily keep track of your net worth and stock holdings. With just a few clicks, you can see how your assets are performing and make informed decisions about your financial future.</p>
                    </div>
                </div>
            </div>
        );
    }

}