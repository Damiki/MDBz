import React,{Component} from 'react';
import AlbumHead from './AlbumComponents/AlbumHead';
import AlbumRating from './AlbumComponents/AlbumRatings';
import AlbumSongs from './AlbumComponents/AlbumSongs';
import Star from './AlbumComponents/Star';
import './Album.css';


class Album extends Component {
  state = {
    rating:0,
    clicked : false,
    stars: [
      {
        id : 1
      },
      {
        id : 2
      },
      {
        id : 3
      },
      {
        id : 4
      },
      {
        id : 5
      }
    ]
  }

  isClicked = (id) =>{
    this.setState(()=>{
      return{
       clicked : true,
       rating : id
      };
    });
  }
  
  renderStars = ()=>{
    this.state.stars.map(x => 
      <Star 
        key = {x.id}
        id = {x.id}
        isClicked = {this.isClicked}
        clicked = {this.state.clicked}
      />
      )
  }

  render() {
    return (
      <div>
        <AlbumHead />
        {this.renderStars()}
        <AlbumSongs />
        <AlbumRatings rating = {this.state.rating}/>
      </div>
    );
  }
}
export default Album