import React, { Component } from "react";
import Star from './Star';

class StarRating extends Component {
constructor(props){
  super(props);
  this.state = {
    rating: 0
  };
  setRating();
}
  
  setRating = () =>{
    this.setState({
      rating: this.props.rating
    });
  };


  renderStars = () => {
    let stars = [];
    let maxRating = 5;

    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <Star
          isSelected={this.state.rating > i}
          key={i}
        />
      );
    }
    return stars;
  }

  render() {
    return (
      <ul className="star_rating">
        { this.renderStars() }
      </ul>
    );
  }
}

export default StarRating;