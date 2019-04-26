import React, { Component } from "react";
import Star from './Star';

class StarRating extends Component {
constructor(props){
  super(props);
  this.state = {
    rating: 0
  };
}

componentWillMount = () => {
  this.setRatingInitial();
}
  
  setRatingInitial = () => {
    this.setState({
      rating: this.props.rating[0].RATING
    })
  }

  isClicked = (e) => {
    this.setState({
      rating: e
    });
    this.setRating(e);
  }

  setRating = (e) => {
    fetch('/setrating/'+this.props.title+'/'+this.props.username+'/'+e);
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
      <div className="star_rating">
        { this.renderStars() }
      </div>
    );
  }
}

export default StarRating;