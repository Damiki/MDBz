import React, { Component } from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import StarRating from './AlbumComponents/StarRating';
import AlbumRatings from './AlbumComponents/AlbumRatings';
import './Album.css';


class Album extends Component {
  constructor(props){
    super(props);
    this.state = {
      rating: 0,
      username: '',
      isLoadingName: true,
      isLoadingRating: true
    }
    this.getUsername();
    this.getRatings();
};

getUsername = () => {

    fetch('/username')
    .then(res =>res.json())
    .then((res)=> 
        this.setState({
          username: res,
          isLoadingName: false
        })
    );
}

getRatings = () =>{
    fetch('ratings/damiki')
    .then(res => res.json())
    .then(rating => this.setState({
        rating: rating,
        isLoadingRating: false
    }));
}
  // isClicked = (e) => {
  //   this.setState({
  //     rating: e
  //   });
  // }

  render() {
    if(this.state.isLoadingName || this.state.isLoadingRating){
      return(
        <div>Loading...</div>
      );
    }else return (
      <div className ="album-container">
        <AlbumHead art = {this.props.art} title = {this.props.album} artist = {this.props.artist}/>
        {/* <StarRating isClicked = {this.isClicked}/> */}
        <StarRating username = {this.state.username} rating = {this.state.rating} title = {this.props.album}/>
        <AlbumSongs title = {this.props.album}/>
        <AlbumRatings title = {this.props.album} username = {this.state.username}/>
      </div>
    );
  }
}
export default Album