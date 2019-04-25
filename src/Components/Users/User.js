import React, { Component } from 'react';
import UserHeader from './UserComponents/UserHeader';
import UserRatings from './UserComponents/UserRating';
import UserImage from './UserComponents/UserImg.png'
// import userRating from './UserComponents/UserRating';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ratings: []
        };
        // this.props.checkLogin();
        this.getUsername();
    };

    getUsername = () => {

        fetch('/username')
        .then(res =>res.json())
        .then((res)=> 
            this.setState({name: res})
        );

        // fetch('ratings/'+this.props.username)
        // .then(res => res.json())
        // .then(ratingres => this.setState({
        //     ratings: ratingres
        // }));
    }

    render() {
        return (
            <div>
                <UserHeader name={this.state.name} id={this.state.id} img={UserImage} />
                <ul>
                    {this.state.ratings.map(rating => (
                        <li key={rating.ALBUM_ID}>
                            <UserRatings artist={rating.ARTIST_NAME}
                                album={rating.TITLE}
                                rating={rating.RATING} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default User;