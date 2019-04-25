import React from 'react';
import StarRating from './AStarRating';

const AlbumRating = ()=>{
  return(
    <div className = "AlbumRating">
        <span>{this.props.username}</span>
        <StarRating rating = {this.props.rating}/>
    </div>
  );
}


export default AlbumRating