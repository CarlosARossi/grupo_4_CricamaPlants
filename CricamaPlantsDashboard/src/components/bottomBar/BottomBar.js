import React from 'react';
import BottomInfo from './BottomInfo';
import PropTypes from 'prop-types';

function BottomBar(props) {
    return(

        <React.Fragment>

            <BottomInfo products="Listado de productos: " total=""/>

        </React.Fragment>
    )
    
}

BottomBar.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number
}

BottomBar.defaultProps = {
    title: "A definir",
    total: 0
}

export default BottomBar;