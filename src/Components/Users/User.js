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
            isLoadingName: true,
            isLoadingRatings: true
        };
        // this.props.checkLogin();
        this.getUsername();
    };

    getUsername = () => {
        fetch('/username')
        .then(res =>res.json())
        .then((res)=> {
            this.setState({
                name: res,
                isLoadingName: false
            });
            this.getRatings(res);
        }
        )
    }

    getRatings = (name) =>{
        console.log("name"+ name);
        fetch('ratings/'+name)
        .then(res => res.json())
        .then(ratings => this.setState({
            ratings: ratings,
            isLoadingRatings: false
        }));
    }

    render() {
        if(this.state.isLoadingRatings || this.state.isLoadingName)
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