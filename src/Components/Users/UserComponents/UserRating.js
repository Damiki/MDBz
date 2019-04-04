import React from 'react';

const userRating = (props) => {
    return (
        <div>
            <div>
                <div>{props.album}</div>
                <div>{props.artist}</div>
                <div>{props.rating}</div>
            </div>
        </div>
    );
}

export default userRating;