import React from 'react';
import CenterInfo from './CenterInfo';
import PropTypes from 'prop-types';
import User from '../User';

function CenterBar(props) {
    return(

        <React.Fragment>

            <CenterInfo product="Último producto creado: " total=""/>
            <CenterInfo user="Último usuario creado:" total=""/> <User />
            <CenterInfo categories="Categorías: " total=""/>

        </React.Fragment>
    )
    
}

CenterBar.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number
}

CenterBar.defaultProps = {
    title: "A definir",
    total: 0
}

export default CenterBar;