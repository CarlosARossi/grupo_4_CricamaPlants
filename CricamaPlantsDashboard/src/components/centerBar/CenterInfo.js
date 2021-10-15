import React from 'react';

function CenterInfo (props) {
    return (
        <React.Fragment>

            <div>
                {props.product}
            </div>

            <div>
                {props.user}
            </div>

            <div>
                {props.categories}
            </div>

        </React.Fragment>
        
    )
}

export default CenterInfo;