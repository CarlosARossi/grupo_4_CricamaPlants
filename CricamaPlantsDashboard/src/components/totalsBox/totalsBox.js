// import de react
import React from 'react';

// import css
import './totalsBox.css'

// import components
import TotalsBand from '../totalsBand/totalsBand';



function TotalsBox() {
    return (
        <div id='div-totalsBox'>
            <h1>Totales</h1>    
            <TotalsBand />
        </div>
    )
}

export default TotalsBox;