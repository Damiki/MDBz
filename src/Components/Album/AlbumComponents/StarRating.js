import React, { Component } from "react";
import Star from './Star';

class StarRating extends Component {
constructor(props){
  super(props);
  this.state = {
    rating: 0
  };
}
  

  isClicked = (e) => {
    this.setState({
      rating: e
    });
  }

  renderStars = () => {
    let stars = [];
    let maxRating = 5;

    for (let i = 0; i < maxRating; i++) {
      stars.push(
        <Star
          isSelected={this.state.rating > i}
          setRating={ () => this.handleSetRating(i + 1) }
          key={i}
        />
      );
    }
    return stars;
  }

  handleSetRating = (rating) => {
    if (this.state.rating === rating) {
      this.setState({ rating: 0 });
    } else {
      this.setState({ rating });
      this.isClicked(rating);
    }
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