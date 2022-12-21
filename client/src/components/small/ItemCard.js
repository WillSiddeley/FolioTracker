import React from "react";

const ItemCard = (props) => {
    return (
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{ props.title }</h5>
                <p className="card-text">{ props.message }</p>
            </div>
        </div>
    )
}

export default ItemCard;