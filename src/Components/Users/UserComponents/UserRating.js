import React from 'react';
import StarRating from './StarRating';

const userRating = (props) => {
    return (
        <div>
            <div>
                <div>{props.album}</div>
                <div>{props.artist}</div>
                <div>{props.rating}</div>
                <StarRating rating = {this.props.rating}/>
            </div>
        </div>
    );
}

export default userRating;