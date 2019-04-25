import React from 'react';

const Card = (props) =>{
    return(
        <div className = "card" >
            <img src = {"http://localhost:3030/albums/"+props.albumart+".jpg"}></img>
            <span>{props.albumname}</span>
            <span>{"    "+props.artist}</span>
        </div>
    );
}

export default Card;