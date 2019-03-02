import React from 'react'
import sample from './samplebg.png'

const AlbumHead = () => {
  return (
    <div className="AlbumHead">
      <img className="AlbumImage" src={sample} />
      <div className="AlbumDesc">
        <span>Title</span><br />
        <span>Artist</span><br />
        <span>Release Date</span><br />
      </div>
    </div>
  );
}


export default AlbumHead;