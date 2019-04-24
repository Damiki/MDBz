import React, { Component } from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import StarRating from './AlbumComponents/StarRating';
import './Album.css';


class Album extends Component {
  state = {
    rating: 0,
  }

  isClicked = (e) => {
    this.setState({
      rating: e
    });
  }

  render() {
    return (
      <div>
        <AlbumHead />
        <StarRating isClicked = {this.isClicked}/>
        <AlbumSongs />
      </div>
    );
  }
}
export default Album