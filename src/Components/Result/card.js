import React from 'react';
import AlbumImage from './album.jpg'

const Card = (props) =>{
    return(
        <div className = "card">
            <img src = {AlbumImage}></img>
            <span>{props.albumname}</span>
            <span>{props.artist}</span>
        </div>
    );
}

export default Card;