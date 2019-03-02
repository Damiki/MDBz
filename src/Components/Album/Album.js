import React from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumRatings from './AlbumComponents/AlbumRatings';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import './Album.css';


const Album = ()=>{
  return(
    <div>
      <AlbumHead />
      <AlbumSongs />
      <AlbumRatings />
    </div>
  );
}

export default Album