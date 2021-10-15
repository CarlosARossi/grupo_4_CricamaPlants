import React from 'react';

function TopInfo (props) {
    return (
        <div>

            <div>
                {props.title}
            </div>

            <div>
                {props.total}
            </div>
        
        </div>
    )
}

export default TopInfo;