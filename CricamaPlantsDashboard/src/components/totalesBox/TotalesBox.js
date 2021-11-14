// import de react
import React from 'react';

// import css
import './TotalesBox.css'

// import components
import TotalesTira from '../totalesTira/totalesTira';



function TotalesBox() {
    return (
        <div id='div-totalesBox'>
            <h1>Totales</h1>    
            <TotalesTira />
        </div>
    )
}

export default TotalesBox;