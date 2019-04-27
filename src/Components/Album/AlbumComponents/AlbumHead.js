import React from 'react'

const AlbumHead = (props) => {
  return (
    <div className="AlbumHead">
      <img
        src={"http://localhost:3030/albums/" + props.art + ".jpg"} alt="">
      </img>
      <div className="AlbumDesc">
        <span><strong>Title: </strong>{props.title}</span><br />
        <span><strong>Artist: </strong>{props.artist}</span><br />
        <span><strong>Average Rating: </strong>{props.average}</span><br />
      </div>
    </div>
  );
}


export default AlbumHead;