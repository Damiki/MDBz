import React from 'react';

const userRating = (props) => {
    return (
        <div>
            <div>
                <div>{props.albumid}</div>
                <div>{props.album}</div>
                <div>{props.rating}</div>
            </div>
        </div>
    );
}

export default userRating;