import React from 'react';

const Card = (props) =>{
    return(
        <div className = "card" >
            <img
                src = {"http://localhost:3030/albums/"+props.albumart+".jpg"} alt="" 
                onClick={() => props.handleClick(props.albumname, props.artist, props.albumart)}>
            </img>
            <p><span>Album: </span> {props.albumname}</p>
            <p><span>Artist: </span> {"    "+props.artist}</p>
        </div>
    );
}

export default Card;