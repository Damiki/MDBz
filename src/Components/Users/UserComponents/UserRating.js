import React from 'react';
import StarRating from './StarRating';

const userRating = (props) => {
    return (
        <div>
            <div>
                <img classname="user-album-img" src={"http://localhost:3030/albums/" + props.img + ".jpg"} alt="" width="40%" height="30%"></img>
                <div><strong>Album: </strong>{props.album}</div>
                <div><strong>Artist: </strong> {props.artist}</div>
                <hr></hr>
                <StarRating rating = {props.rating}/>
            </div>
        </div>
    );
}

export default userRating;