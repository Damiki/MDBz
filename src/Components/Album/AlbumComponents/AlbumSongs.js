import React, { Component } from 'react'

class AlbumSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      isLoading: true
    }
    getSongs();
  };

  getSongs = () => {
    fetch('/songs/'+this.props.title)
    .then(res => res.json())
    .then(songs => this.setState({
      songs: songs,
      isLoading:false
    }));
  }

  render() {
    if(isLoading){
      return(
        <div>Loading...</div>
      );
    }else return (
      <div className="AlbumTrack">
        <h1>Tracks:</h1>
        <ul>
          {this.state.songs.map(song => (
            <li key = {song.songid}>{song.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}


export default AlbumSongs;