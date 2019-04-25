import React from 'react';

const Card = (props) =>{
    return(
        <div className = "card" >
            <img
                src = {"http://localhost:3030/albums/"+props.albumart+".jpg"} alt="" 
                onClick={() => props.handleClick(props.albumname, props.artist, props.albumart)}>
            </img>
            <span>{props.albumname}</span>
            <span>{"    "+props.artist}</span>
        </div>
    );
}

export default Card;