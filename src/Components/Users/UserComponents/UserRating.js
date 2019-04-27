import React from 'react';
import StarRating from './StarRating';

const userRating = (props) => {
    return (
        <div>
            <div>
                <div>{props.album}</div>
                <div>{props.artist}</div>
                <div>{props.rating}</div>
                <StarRating rating = {props.rating}/>
                <span><button className="remove-player" onClick={() => props.deleteRating(props.album)}>✖</button></span>
            </div>
        </div>
    );
}

export default userRating;