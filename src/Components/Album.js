import React from 'react';
import AlbumHead from './Album/AlbumHead';
import AlbumRatings from './Album/AlbumRatings';
import AlbumSongs from './Album/AlbumSongs';
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