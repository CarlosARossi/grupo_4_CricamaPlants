import React from 'react';
import TopInfo from './TopInfo';
import PropTypes from 'prop-types';
import User from '../User';

function TopBar(props) {
    return(
        
        <React.Fragment>
            <div>{User}</div>
            <TopInfo title="Total de productos en stock: " total=""/>
            <TopInfo title="Total de usuarios:" total=""/><User />
            <TopInfo title="Total de categorías: " total=""/>

        </React.Fragment>)

}

TopBar.propTypes = {
    title: PropTypes.string,
    total: PropTypes.number
}

TopBar.defaultProps = {
    title: "A definir",
    total: 0
}

export default TopBar;