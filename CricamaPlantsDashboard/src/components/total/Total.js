// import de react
import React from "react";

// import prop-types
import PropTypes from "prop-types";

// import css 
import './Total.css';


function Total (props) {
    return (
        <div className={`div-total ${props.color}`}>
            <p>Total {props.name}</p>
            <p>{props.quantity}</p>


        </div>
    )
}

export default Total;

Total.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    quantity: PropTypes.number,
}

Total.defaultProps = {
    name: "Sin nombre",
    quantity: 0 ,
}