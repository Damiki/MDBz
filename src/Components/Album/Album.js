import React, { Component } from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import StarRating from './AlbumComponents/StarRating';
import './Album.css';


class Album extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   rating: 0
    // }
    this.props.checkLogin();
  }

  // isClicked = (e) => {
  //   this.setState({
  //     rating: e
  //   });
  // }

  render() {
    return (
      <div>
        <AlbumHead />
        {/* <StarRating isClicked = {this.isClicked}/> */}
        <StarRating />
        <AlbumSongs />
      </div>
    );
  }
}
export default Album