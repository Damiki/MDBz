import React, { Component } from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import StarRating from './AlbumComponents/StarRating';
// import AlbumRatings from './AlbumComponents/AlbumRatings';
import './Album.css';


class Album extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   rating: 0
    // }
  }

  // isClicked = (e) => {
  //   this.setState({
  //     rating: e
  //   });
  // }

  render() {
    return (
      <div className ="album-container">
        <AlbumHead art = {this.props.art} title = {this.props.album} artist = {this.props.artist}/>
        {/* <StarRating isClicked = {this.isClicked}/> */}
        <StarRating />
        <AlbumSongs title = {this.props.album}/>
        {/* <AlbumRatings title = {this.props.album}/> */}
      </div>
    );
  }
}
export default Album