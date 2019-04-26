import React from 'react'

const AlbumHead = () => {
  return (
    <div className="AlbumHead">
      <img
        src={"http://localhost:3030/albums/" + props.art + ".jpg"} alt="">
      </img>
      <div className="AlbumDesc">
        <span><h1>Title: </h1>{props.title}</span><br />
        <span><h2>Artist: </h2>{props.artist}</span><br />
      </div>
    </div>
  );
}


export default AlbumHead;