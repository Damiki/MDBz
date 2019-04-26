import React,{Component} from 'react';
import StarRating from './AStarRating';

class AlbumRating extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      ratings: []
    }
    this.getRatings();
  }

  getRatings = () => {
    fetch('/rating/'+this.props.title+'/'+this.props.username)
    .then(res => res.json())
    .then(songs => this.setState({
      songs: songs,
      isLoading:false
    }));
  }

  render(){
    if(this.state.isLoading){
      return(
        <div>Loading...</div>
      );
    }else return(
      <div className = "AlbumRating">
          <ul>
            {this.state.ratings.map( rating => {
              <li key = {rating.username}>
                <span>{rating.username}</span>
                <StarRating rating = {rating.rating}/>
              </li>
            })}
          </ul>
      </div>
    );
  }
}


export default AlbumRating;