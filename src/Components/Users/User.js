import React, { Component } from 'react';
import UserHeader from './UserComponents/UserHeader';
import UserRatings from './UserComponents/UserRating';
import UserImage from './UserComponents/UserImg.png';
import './User.css';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ratings: [],
            isLoading: true
        };
        // this.props.checkLogin();
        this.getUsername();
        this.getRatings();
    };

    getUsername = () => {

        fetch('/username')
        .then(res =>res.json())
        .then((res)=> 
            this.setState({name: res})
        );
    }

    getRatings = () =>{
        fetch('ratings/damiki')
        .then(res => res.json())
        .then(ratings => this.setState({
            ratings: ratings,
            isLoading: false
        }));
    }

    render() {
        if(this.state.isLoading)
                return(
                    <div>Loading</div>
                );
        else
        return (
            <div className="user-container">
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